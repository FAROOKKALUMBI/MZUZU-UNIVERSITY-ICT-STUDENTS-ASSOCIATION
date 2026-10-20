import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Find the resources directory in public
const publicDir = path.join(rootDir, 'public');
let resourcesFolder = 'RESOURCES';
if (!fs.existsSync(path.join(publicDir, resourcesFolder))) {
  if (fs.existsSync(path.join(publicDir, 'resources'))) {
    resourcesFolder = 'resources';
  } else {
    console.error('Neither public/RESOURCES nor public/resources was found.');
    process.exit(1);
  }
}

const resourcesFullPath = path.join(publicDir, resourcesFolder);
console.log(`Scanning resources in: ${resourcesFullPath}`);

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function parseYear(levelPart) {
  const upper = (levelPart || '').toUpperCase();
  if (upper.includes('LEVEL 1') || upper.includes('YEAR 1')) return 'Year 1';
  if (upper.includes('LEVEL 2') || upper.includes('YEAR 2')) return 'Year 2';
  if (upper.includes('LEVEL 3') || upper.includes('YEAR 3')) return 'Year 3';
  if (upper.includes('LEVEL 4') || upper.includes('YEAR 4')) return 'Year 4';
  return 'Year 1';
}

function parseSemester(semPart) {
  const upper = (semPart || '').toUpperCase();
  if (
    upper.includes('ONE') ||
    upper.includes('SEM 1') ||
    upper.includes('SEMESTER 1') ||
    upper.includes('SEMESTER 3') ||
    upper.includes('SEMESTER 5') ||
    upper.includes('SEMESTER 7')
  ) {
    return 'Semester 1';
  }
  if (
    upper.includes('TWO') ||
    upper.includes('SEM 2') ||
    upper.includes('SEMESTER 2') ||
    upper.includes('SEMESTER 4') ||
    upper.includes('SEMESTER 6') ||
    upper.includes('SEMESTER 8')
  ) {
    return 'Semester 2';
  }
  return 'Semester 1';
}

function getFolderCategory(subFolderContext, fileName) {
  const folderLow = subFolderContext.toLowerCase();
  const fileLow = fileName.toLowerCase();

  // 1. Folder checks provide the hint that the files in there are notes, pastpapers, tutorials, books, or outlines
  if (
    folderLow.includes('pastpaper') ||
    folderLow.includes('past paper') ||
    folderLow.includes('past-paper') ||
    folderLow.includes('exam prep') ||
    folderLow.includes('exam tips')
  ) {
    return { id: 'past-papers', label: 'Past Papers' };
  }
  if (folderLow.includes('course outline') || folderLow.includes('outline')) {
    return { id: 'course-outlines', label: 'Course Outlines' };
  }
  if (folderLow.includes('books') || folderLow.includes('book')) {
    return { id: 'books', label: 'Books' };
  }
  if (
    folderLow.includes('tutorial') ||
    folderLow.includes('assignment') ||
    folderLow.includes('codes') ||
    folderLow.includes('lab')
  ) {
    return { id: 'tutorials', label: 'Tutorials' };
  }
  if (folderLow.includes('notes') || folderLow.includes('lecture')) {
    return { id: 'lecture-notes', label: 'Notes' };
  }

  // 2. File name checks
  if (/\b(outline|syllabus)\b/i.test(fileLow)) {
    return { id: 'course-outlines', label: 'Course Outlines' };
  }
  if (
    /\b(past\s*paper|exam|examination|end\s*of\s*semester|supplementary|mid\s*semester|test\s*\d+)\b/i.test(
      fileLow
    )
  ) {
    return { id: 'past-papers', label: 'Past Papers' };
  }
  if (/\b(book|textbook|guide\s*to|z-lib|for\s*dummies|edition)\b/i.test(fileLow)) {
    return { id: 'books', label: 'Books' };
  }
  if (
    /\b(assignment|tutorial|lab\s*manual|exercises?)\b/i.test(fileLow) ||
    fileLow.endsWith('.mp4') ||
    fileLow.endsWith('.c') ||
    fileLow.endsWith('.cpp')
  ) {
    return { id: 'tutorials', label: 'Tutorials' };
  }

  return { id: 'lecture-notes', label: 'Notes' };
}

// Transform file name into natural "words of the papers"
function toPaperWords(fileName) {
  const parsed = path.parse(fileName);
  let name = parsed.name;

  // Remove copy duplicates like (1), (2), but keep 4-digit years intact
  name = name.replace(/\s*\(\d+\)$/, '').replace(/-\d{1,2}$/, '');

  // Remove common third-party app watermarks
  name = name.replace(/\(z-lib\.org\)/gi, '');
  name = name.replace(/-WPS\s*Office/gi, '');
  name = name.replace(/\[Compatibility\s*Mode\]/gi, '');
  name = name.replace(/\.pptx?$/gi, '');
  name = name.replace(/\.pdf$/gi, '');
  name = name.replace(/\.docx?$/gi, '');

  // Remove leading non-alphanumeric symbols
  name = name.replace(/^[^a-zA-Z0-9]+/, '');

  // If name has many hyphens like a-b-c-d, replace internal hyphens with spaces
  if ((name.match(/-/g) || []).length > 2) {
    name = name.replace(/([a-zA-Z0-9])-(?=[a-zA-Z0-9])/g, '$1 ');
  }

  // Replace underscores and separated dots with spaces
  name = name.replace(/_/g, ' ');
  name = name.replace(/(?<=[a-zA-Z])\.(?=[a-zA-Z])/g, ' ');

  // Separate letter-number combinations like Notes1 -> Notes 1, but keep BICT1101, L1, etc.
  name = name.replace(/([a-zA-Z]{3,})(\d{1,2})\b/g, '$1 $2');

  // Normalize spacing and hyphens
  name = name.replace(/\s*-\s*/g, ' - ');
  name = name.replace(/\s{2,}/g, ' ').trim();

  // Known uppercase acronyms to preserve
  const preserveUpper = new Set([
    'BICT', 'COMM', 'MATH', 'ICT', 'BSC', 'BISC', 'BNMU', 'BSTO', 'IS', 'IT',
    'CPU', 'OSI', 'TCP', 'IP', 'LAN', 'WAN', 'ATM', 'QOS', 'DNS', 'HTTP',
    'HTML', 'CSS', 'PHP', 'SQL', 'UML', 'OOAD', 'C++', 'AI', 'PC', 'RAM',
    'ROM', 'IDE', 'SATA', 'USB', 'BIOS', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'
  ]);

  const lowerWords = new Set(['and', 'of', 'the', 'in', 'on', 'at', 'to', 'for', 'by', 'with', 'a', 'an', 'et', 'en']);

  const words = name.split(' ').map((w, index) => {
    const cleanW = w.replace(/[^a-zA-Z0-9+]/g, '');
    if (preserveUpper.has(cleanW.toUpperCase()) || /^[A-Z]+\d+$/.test(cleanW)) {
      return w.toUpperCase();
    }
    // If the word is entirely uppercase, convert to Title Case unless it's a minor connecting word
    if (w === w.toUpperCase() && w.length > 1) {
      if (index > 0 && lowerWords.has(w.toLowerCase())) return w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }
    // If word is entirely lowercase, capitalize first letter unless it's a minor connecting word
    if (w === w.toLowerCase()) {
      if (index > 0 && lowerWords.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    }
    return w;
  });

  let result = words.join(' ').trim();
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result || fileName;
}

function makeSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80);
}

const resources = [];
const seenSlugs = new Set();
let counter = 0;

function walk(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile()) {
      // Ignore system files
      if (
        entry.name.startsWith('.') ||
        entry.name === 'Thumbs.db' ||
        entry.name.endsWith('.tmp') ||
        entry.name.endsWith('.download')
      ) {
        continue;
      }

      counter++;
      const relFromResources = path.relative(resourcesFullPath, fullPath);
      const relFromPublic = path.relative(publicDir, fullPath).replace(/\\/g, '/');
      const parts = relFromResources.split(path.sep);

      const levelPart = parts[0] || 'LEVEL 1';
      const semPart = parts[1] || 'SEMESTER ONE';
      const courseFolder = parts[2] || 'GENERAL';

      const year = parseYear(levelPart);
      const semester = parseSemester(semPart);

      // Folder hint: the actual folder name on disk provides the hint!
      const subContext = parts.slice(3, -1).join(' / ');
      const folderHint = subContext ? `${courseFolder} / ${subContext}` : courseFolder;

      const catInfo = getFolderCategory(subContext || relFromResources, entry.name);

      const stat = fs.statSync(fullPath);
      const fileSize = formatBytes(stat.size);
      const ext = path.extname(entry.name).replace('.', '').toUpperCase() || 'FILE';

      // Words of the papers!
      const fileName = entry.name;
      const paperWords = toPaperWords(fileName);

      // Unique slug
      let baseSlug = makeSlug(`${courseFolder}-${paperWords}`);
      if (!baseSlug) baseSlug = `res-${counter}`;
      let slug = baseSlug;
      let dup = 1;
      while (seenSlugs.has(slug)) {
        slug = `${baseSlug}-${dup}`;
        dup++;
      }
      seenSlugs.add(slug);

      // Encode downloadUrl
      const urlParts = relFromPublic.split('/').map((segment) => encodeURIComponent(segment));
      const downloadUrl = `/${urlParts.join('/')}`;

      resources.push({
        id: `res-${counter}`,
        slug,
        title: paperWords,
        paperTitle: paperWords,
        fileName,
        filePath: relFromPublic,
        category: catInfo.id,
        folderCategory: catInfo.label,
        folderName: courseFolder,
        folderHint,
        year,
        semester,
        fileSize,
        fileType: ext,
        downloadUrl,
      });
    }
  }
}

walk(resourcesFullPath);

console.log(`Successfully indexed ${resources.length} resources!`);

// Save to JSON
const outputPath = path.join(rootDir, 'src', 'data', 'resourcesData.json');
fs.writeFileSync(outputPath, JSON.stringify(resources, null, 2), 'utf-8');
console.log(`Written to ${outputPath}`);
