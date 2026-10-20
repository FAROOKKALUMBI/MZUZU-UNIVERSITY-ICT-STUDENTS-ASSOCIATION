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

      // Middleware: Rewrite /resources/* to /RESOURCES/* if needed
      server.middlewares.use((req, _res, next) => {
        if (req.url && req.url.startsWith('/resources/')) {
          req.url = req.url.replace(/^\/resources\//, '/RESOURCES/');
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), resourcesWatcherPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
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
