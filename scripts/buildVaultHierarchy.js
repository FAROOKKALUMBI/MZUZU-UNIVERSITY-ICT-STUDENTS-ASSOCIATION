import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicDir = path.join(rootDir, 'public');
let resourcesFolder = 'RESOURCES';
if (!fs.existsSync(path.join(publicDir, resourcesFolder))) {
  if (fs.existsSync(path.join(publicDir, 'resources'))) {
    resourcesFolder = 'resources';
  } else {
    console.error('Resources directory not found.');
    process.exit(1);
  }
}

const resourcesFullPath = path.join(publicDir, resourcesFolder);

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function toPaperWords(fileName) {
  const parsed = path.parse(fileName);
  let name = parsed.name;

  name = name.replace(/\s*\(\d+\)$/, '').replace(/-\d{1,2}$/, '');
  name = name.replace(/\(z-lib\.org\)/gi, '');
  name = name.replace(/-WPS\s*Office/gi, '');
  name = name.replace(/\[Compatibility\s*Mode\]/gi, '');
  name = name.replace(/\.pptx?$/gi, '');
  name = name.replace(/\.pdf$/gi, '');
  name = name.replace(/\.docx?$/gi, '');
  name = name.replace(/^[^a-zA-Z0-9]+/, '');

  if ((name.match(/-/g) || []).length > 2) {
    name = name.replace(/([a-zA-Z0-9])-(?=[a-zA-Z0-9])/g, '$1 ');
  }

  name = name.replace(/_/g, ' ');
  name = name.replace(/(?<=[a-zA-Z])\.(?=[a-zA-Z])/g, ' ');
  name = name.replace(/([a-zA-Z]{3,})(\d{1,2})\b/g, '$1 $2');
  name = name.replace(/\s*-\s*/g, ' - ');
  name = name.replace(/\s{2,}/g, ' ').trim();

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
    if (w === w.toUpperCase() && w.length > 1) {
      if (index > 0 && lowerWords.has(w.toLowerCase())) return w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }
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

function getCategory(subFolderContext, fileName) {
  const folderLow = subFolderContext.toLowerCase();
  const fileLow = fileName.toLowerCase();

  if (
    folderLow.includes('pastpaper') ||
    folderLow.includes('past paper') ||
    folderLow.includes('past-paper') ||
    folderLow.includes('exam prep') ||
    folderLow.includes('exam tips')
  ) {
    return { key: 'pastPapers', id: 'past-papers', label: 'Past Papers' };
  }
  if (folderLow.includes('course outline') || folderLow.includes('outline')) {
    return { key: 'outlines', id: 'course-outlines', label: 'Course Outlines' };
  }
  if (folderLow.includes('books') || folderLow.includes('book')) {
    return { key: 'books', id: 'books', label: 'Books' };
  }
  if (
    folderLow.includes('tutorial') ||
    folderLow.includes('assignment') ||
    folderLow.includes('codes') ||
    folderLow.includes('lab')
  ) {
    return { key: 'tutorials', id: 'tutorials', label: 'Tutorials' };
  }
  if (folderLow.includes('notes') || folderLow.includes('lecture')) {
    return { key: 'notes', id: 'lecture-notes', label: 'Notes' };
  }

  if (/\b(outline|syllabus)\b/i.test(fileLow)) {
    return { key: 'outlines', id: 'course-outlines', label: 'Course Outlines' };
  }
  if (
    /\b(past\s*paper|exam|examination|end\s*of\s*semester|supplementary|mid\s*semester|test\s*\d+)\b/i.test(
      fileLow
    )
  ) {
    return { key: 'pastPapers', id: 'past-papers', label: 'Past Papers' };
  }
  if (/\b(book|textbook|guide\s*to|z-lib|for\s*dummies|edition)\b/i.test(fileLow)) {
    return { key: 'books', id: 'books', label: 'Books' };
  }
  if (
    /\b(assignment|tutorial|lab\s*manual|exercises?)\b/i.test(fileLow) ||
    fileLow.endsWith('.mp4') ||
    fileLow.endsWith('.c') ||
    fileLow.endsWith('.cpp')
  ) {
    return { key: 'tutorials', id: 'tutorials', label: 'Tutorials' };
  }

  return { key: 'notes', id: 'lecture-notes', label: 'Notes' };
}

function makeSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80);
}

// 4 Levels definition
const LEVELS = [
  {
    id: 'level-1',
    number: 1,
    name: 'Level 1',
    yearTitle: 'First Year',
    description: 'Foundations of ICT, programming concepts, computer architecture, and discrete mathematics.',
    semesters: ['Semester 1', 'Semester 2'],
    folderKey: 'LEVEL 1',
  },
  {
    id: 'level-2',
    number: 2,
    name: 'Level 2',
    yearTitle: 'Second Year',
    description: 'Intermediate computing, data structures, database design, and systems engineering.',
    semesters: ['Semester 3', 'Semester 4'],
    folderKey: 'LEVEL 2',
  },
  {
    id: 'level-3',
    number: 3,
    name: 'Level 3',
    yearTitle: 'Third Year',
    description: 'Advanced networking, mobile telecoms, object-oriented design, web programming, and distributed systems.',
    semesters: ['Semester 5', 'Semester 6'],
    folderKey: 'LEVEL 3',
  },
  {
    id: 'level-4',
    number: 4,
    name: 'Level 4',
    yearTitle: 'Fourth Year',
    description: 'Software engineering, modelling & simulation, network security, IT audit, and entrepreneurship.',
    semesters: ['Semester 7', 'Semester 8'],
    folderKey: 'LEVEL 4',
  },
];

let globalCounter = 0;
const seenSlugs = new Set();

const hierarchy = LEVELS.map((lvl) => {
  const levelPath = path.join(resourcesFullPath, lvl.folderKey);
  const coursesMap = new Map();

  if (fs.existsSync(levelPath)) {
    const semFolders = fs.readdirSync(levelPath, { withFileTypes: true });

    for (const semEntry of semFolders) {
      if (!semEntry.isDirectory()) continue;
      const semPath = path.join(levelPath, semEntry.name);
      const semUpper = semEntry.name.toUpperCase();
      let semesterName = 'Semester 1';
      if (
        semUpper.includes('TWO') ||
        semUpper.includes('SEM 2') ||
        semUpper.includes('SEMESTER 2') ||
        semUpper.includes('SEMESTER 4') ||
        semUpper.includes('SEMESTER 6') ||
        semUpper.includes('SEMESTER 8')
      ) {
        semesterName = 'Semester 2';
      }

      const courseFolders = fs.readdirSync(semPath, { withFileTypes: true });

      for (const courseEntry of courseFolders) {
        // Could be a course folder or direct loose file
        if (courseEntry.isDirectory()) {
          const courseName = courseEntry.name;
          const courseId = makeSlug(courseName);

          if (!coursesMap.has(courseId)) {
            coursesMap.set(courseId, {
              id: courseId,
              code: courseName,
              name: courseName,
              semester: semesterName,
              levelId: lvl.id,
              materialCounts: {
                notes: 0,
                pastPapers: 0,
                tutorials: 0,
                books: 0,
                outlines: 0,
                total: 0,
              },
              materials: {
                notes: [],
                pastPapers: [],
                tutorials: [],
                books: [],
                outlines: [],
              },
            });
          }

          const courseObj = coursesMap.get(courseId);
          const fullCourseDir = path.join(semPath, courseEntry.name);

          // Walk files in this course folder
          function walkCourse(dir) {
            const files = fs.readdirSync(dir, { withFileTypes: true });
            for (const f of files) {
              const fullF = path.join(dir, f.name);
              if (f.isDirectory()) {
                walkCourse(fullF);
              } else if (f.isFile()) {
                if (
                  f.name.startsWith('.') ||
                  f.name === 'Thumbs.db' ||
                  f.name.endsWith('.tmp') ||
                  f.name.endsWith('.download')
                ) {
                  continue;
                }

                globalCounter++;
                const relFromCourse = path.relative(fullCourseDir, fullF);
                const relFromPublic = path.relative(publicDir, fullF).replace(/\\/g, '/');
                const subContext = path.dirname(relFromCourse);

                const cat = getCategory(subContext, f.name);
                const stat = fs.statSync(fullF);
                const fileSize = formatBytes(stat.size);
                const ext = path.extname(f.name).replace('.', '').toUpperCase() || 'FILE';
                const paperWords = toPaperWords(f.name);

                let baseSlug = makeSlug(`${courseId}-${paperWords}`);
                if (!baseSlug) baseSlug = `mat-${globalCounter}`;
                let slug = baseSlug;
                let dup = 1;
                while (seenSlugs.has(slug)) {
                  slug = `${baseSlug}-${dup}`;
                  dup++;
                }
                seenSlugs.add(slug);

                const urlParts = relFromPublic.split('/').map((s) => encodeURIComponent(s));
                const downloadUrl = `/${urlParts.join('/')}`;

                const item = {
                  id: `mat-${globalCounter}`,
                  slug,
                  title: paperWords,
                  fileName: f.name,
                  fileType: ext,
                  fileSize,
                  downloadUrl,
                  filePath: relFromPublic,
                  category: cat.id,
                  categoryLabel: cat.label,
                  subfolder: subContext !== '.' ? subContext.replace(/\\/g, ' / ') : '',
                };

                courseObj.materials[cat.key].push(item);
                courseObj.materialCounts[cat.key]++;
                courseObj.materialCounts.total++;
              }
            }
          }

          walkCourse(fullCourseDir);
        } else if (courseEntry.isFile()) {
          // Loose file in semester folder (e.g. ICT Department Program Outlines.pdf)
          if (
            courseEntry.name.startsWith('.') ||
            courseEntry.name === 'Thumbs.db' ||
            courseEntry.name.endsWith('.tmp')
          ) {
            continue;
          }
          const courseId = 'general-outlines';
          if (!coursesMap.has(courseId)) {
            coursesMap.set(courseId, {
              id: courseId,
              code: 'General',
              name: 'General Semester Outlines & Guides',
              semester: semesterName,
              levelId: lvl.id,
              materialCounts: {
                notes: 0,
                pastPapers: 0,
                tutorials: 0,
                books: 0,
                outlines: 0,
                total: 0,
              },
              materials: {
                notes: [],
                pastPapers: [],
                tutorials: [],
                books: [],
                outlines: [],
              },
            });
          }
          const courseObj = coursesMap.get(courseId);
          const fullF = path.join(semPath, courseEntry.name);
          const stat = fs.statSync(fullF);
          const fileSize = formatBytes(stat.size);
          const ext = path.extname(courseEntry.name).replace('.', '').toUpperCase() || 'FILE';
          const paperWords = toPaperWords(courseEntry.name);
          const relFromPublic = path.relative(publicDir, fullF).replace(/\\/g, '/');
          const urlParts = relFromPublic.split('/').map((s) => encodeURIComponent(s));
          const downloadUrl = `/${urlParts.join('/')}`;

          globalCounter++;
          const item = {
            id: `mat-${globalCounter}`,
            slug: makeSlug(`gen-${paperWords}`),
            title: paperWords,
            fileName: courseEntry.name,
            fileType: ext,
            fileSize,
            downloadUrl,
            filePath: relFromPublic,
            category: 'course-outlines',
            categoryLabel: 'Course Outlines',
            subfolder: '',
          };
          courseObj.materials.outlines.push(item);
          courseObj.materialCounts.outlines++;
          courseObj.materialCounts.total++;
        }
      }
    }
  }

  const courses = Array.from(coursesMap.values()).sort((a, b) => a.code.localeCompare(b.code));
  const totalMaterials = courses.reduce((acc, c) => acc + c.materialCounts.total, 0);

  return {
    id: lvl.id,
    number: lvl.number,
    name: lvl.name,
    yearTitle: lvl.yearTitle,
    description: lvl.description,
    semesters: lvl.semesters,
    totalCourses: courses.length,
    totalMaterials,
    courses,
  };
});

console.log('Hierarchy generated:');
for (const lvl of hierarchy) {
  console.log(`- ${lvl.name} (${lvl.yearTitle}): ${lvl.totalCourses} courses, ${lvl.totalMaterials} materials`);
}

const outputPath = path.join(rootDir, 'src', 'data', 'vaultHierarchy.json');
fs.writeFileSync(outputPath, JSON.stringify(hierarchy, null, 2), 'utf-8');
console.log(`Successfully written to ${outputPath}!`);
