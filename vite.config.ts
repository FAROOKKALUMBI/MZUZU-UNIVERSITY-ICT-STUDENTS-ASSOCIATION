import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';

function resourcesWatcherPlugin(): Plugin {
  let debounceTimeout: NodeJS.Timeout | null = null;

  const triggerRegen = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      console.log('\n[MUISA Resources] Changes detected in public/RESOURCES, updating index...');
      exec('node scripts/generateResources.js && node scripts/buildVaultHierarchy.js', (err, stdout, stderr) => {
        if (err) {
          console.error('[MUISA Resources] Generation failed:', stderr);
        } else {
          console.log('[MUISA Resources] Indexed & Hierarchy built successfully!');
        }
      });
    }, 1500);
  };

  return {
    name: 'muisa-resources-watcher',
    buildStart() {
      const dataFile = path.resolve(__dirname, 'src/data/vaultHierarchy.json');
      if (!fs.existsSync(dataFile)) {
        console.log('[MUISA Resources] vaultHierarchy.json missing, generating now...');
        exec('node scripts/generateResources.js && node scripts/buildVaultHierarchy.js');
      }
    },
    configureServer(server) {
      // Watch public/RESOURCES
      const targetDir = path.resolve(__dirname, 'public/RESOURCES');
      if (fs.existsSync(targetDir)) {
        server.watcher.add(targetDir);
      }
      server.watcher.on('add', (file) => {
        if (file.includes('RESOURCES') || file.includes('resources')) triggerRegen();
      });
      server.watcher.on('unlink', (file) => {
        if (file.includes('RESOURCES') || file.includes('resources')) triggerRegen();
      });

      // Middleware: Rewrite /resources/* to /RESOURCES/* ONLY for static file assets (with extensions), NOT React Router routes
      server.middlewares.use((req, _res, next) => {
        if (
          req.url &&
          req.url.startsWith('/resources/') &&
          /\.(pdf|mp4|webm|mkv|flv|avi|docx?|pptx?|zip|rar|jpg|jpeg|png|webp|svg|c|cpp|sql|txt)(\?|#|$)/i.test(req.url)
        ) {
          req.url = req.url.replace(/^\/resources\//i, '/RESOURCES/');
        }
        next();
      });
    },
  };
}

function copyDirFiltered(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcEntry = path.join(src, entry.name);
    const destEntry = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirFiltered(srcEntry, destEntry);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Skip heavy video binaries (> 50-500MB) from copying into dist
      if (['.mp4', '.webm', '.mkv', '.flv', '.avi', '.iso'].includes(ext)) {
        continue;
      }
      try {
        fs.copyFileSync(srcEntry, destEntry);
      } catch (e) {
        // ignore locked files
      }
    }
  }
}

function selectivePublicCopyPlugin(): Plugin {
  return {
    name: 'selective-public-copy',
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir) || !fs.existsSync(publicDir)) return;

      const items = fs.readdirSync(publicDir);
      for (const item of items) {
        const srcPath = path.join(publicDir, item);
        const destPath = path.join(distDir, item);

        if (item === 'RESOURCES' || item === 'resources') {
          copyDirFiltered(srcPath, destPath);
          continue;
        }

        fs.cpSync(srcPath, destPath, { recursive: true });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), resourcesWatcherPlugin(), selectivePublicCopyPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    copyPublicDir: false,
    chunkSizeWarningLimit: 3500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('vaultHierarchy.json') || id.includes('resourcesData.json')) {
            return 'academic-vault-data';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
