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
    console.warn('Resources directory not found; keeping the existing vault hierarchy.');
    process.exit(0);
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

  // 1. First priority: Outlines & Syllabi
  if (
    folderLow.includes('course outline') ||
    folderLow.includes('outline') ||
    /\b(outline|syllabus)\b/i.test(fileLow) ||
    fileLow.includes('outline') ||
    fileLow.includes('syllabus')
  ) {
    return { key: 'outlines', id: 'course-outlines', label: 'Course Outlines' };
  }

  // 2. Past Examination Papers
  if (
    folderLow.includes('pastpaper') ||
    folderLow.includes('past paper') ||
    folderLow.includes('past-paper') ||
    folderLow.includes('exam prep') ||
    folderLow.includes('exam tips')
  ) {
    return { key: 'pastPapers', id: 'past-papers', label: 'Past Papers' };
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

function resolveCourseMeta(folderName, levelId, semesterName) {
  const clean = folderName.trim();
  const upper = clean.toUpperCase();

  // Level 1 Semester 1
  if (upper.includes('BICT 1101') || upper === 'BICT1101') {
    return {
      code: 'BICT 1101',
      name: 'End-User Computing',
      displayName: 'End-User Computing (BICT 1101)',
    };
  }
  if (upper.includes('BICT 1102') || upper === 'BICT1102') {
    return {
      code: 'BICT 1102',
      name: 'Introduction to Programming',
      displayName: 'Introduction to Programming (BICT 1102)',
    };
  }
  if (upper.includes('BICT1103') || upper.includes('BICT 1103') || upper.includes('COCOT')) {
    return {
      code: 'BICT 1103',
      name: 'Computer and Communication Technology',
      displayName: 'Computer and Communication Technology (BICT 1103)',
    };
  }
  if (upper.includes('COMM1101') || upper.includes('COMM 1101')) {
    return {
      code: 'COMM 1101',
      name: 'Communication Skills I',
      displayName: 'Communication Skills I (COMM 1101)',
    };
  }
  if (upper.includes('MATH1101') || upper.includes('MATH 1101') || upper.includes('PRECALCULUS')) {
    return {
      code: 'MATH 1101',
      name: 'Precalculus',
      displayName: 'Precalculus (MATH 1101)',
    };
  }

  // Level 1 Semester 2
  if (upper.includes('COMM1201') || upper.includes('COMM 1201')) {
    return {
      code: 'COMM 1201',
      name: 'Communication Skills II',
      displayName: 'Communication Skills II (COMM 1201)',
    };
  }
  if (upper.includes('PC MAINTENANCE') || upper.includes('PC MAINTANANCE')) {
    return {
      code: 'BICT 1201',
      name: 'PC Management and Maintenance',
      displayName: 'PC Management and Maintenance (BICT 1201)',
    };
  }
  if (upper.includes('COMPUTER ARCHITERCHITURE') || upper.includes('COMPUTER ARCHITECTURE')) {
    return {
      code: 'BICT 1202',
      name: 'Computer Architecture and Organisation',
      displayName: 'Computer Architecture and Organisation (BICT 1202)',
    };
  }
  if (upper.includes('MULTIMEDIA')) {
    return {
      code: 'BICT 1203',
      name: 'Multimedia Systems',
      displayName: 'Multimedia Systems (BICT 1203)',
    };
  }
  if (upper.includes('COURSE OUTLINES') || upper === 'COURSE OUTLINES') {
    return {
      code: 'General',
      name: 'Course Outlines & Curricula',
      displayName: 'Course Outlines & Curricula',
    };
  }

  // Level 2 Semester 3
  if (upper.includes('OPERATING SYSTEM') || upper.includes('BICT 2301') || upper.includes('BICT2301')) {
    return {
      id: 'bict-2301-operating-systems',
      code: 'BICT 2301',
      name: 'Operating Systems',
      displayName: 'Operating Systems (BICT 2301)',
    };
  }
  if (upper.includes('PROGRAMMING IN JAVA') || upper.includes('JAVA PREP') || upper.includes('BICT 2302') || upper.includes('BICT2302')) {
    return {
      id: 'bict-2302-programming-in-java',
      code: 'BICT 2302',
      name: 'Programming in Java',
      displayName: 'Programming in Java (BICT 2302)',
    };
  }
  if (((upper.includes('NETWORKS') && !upper.includes('NETWORKS II') && !upper.includes('NETWORKS 2') && !upper.includes('3501')) || upper.includes('BICT 2303') || upper.includes('BICT2303'))) {
    return {
      id: 'bict-2303-computer-networks-i',
      code: 'BICT 2303',
      name: 'Computer Networks I',
      displayName: 'Computer Networks I (BICT 2303)',
    };
  }
  if (upper.includes('WEB DESIGN') || upper.includes('BICT 2304') || upper.includes('BICT2304')) {
    return {
      id: 'bict-2304-web-design',
      code: 'BICT 2304',
      name: 'Web Design',
      displayName: 'Web Design (BICT 2304)',
    };
  }
  if (upper.includes('STATISTICAL') || upper.includes('STATISTICS') || upper.includes('MATH 2301') || upper.includes('MATH2301') || upper.includes('STAT 2301') || upper.includes('STAT2301')) {
    return {
      id: 'math-2301-statistical-analysis',
      code: 'MATH 2301',
      name: 'Introduction to Statistical Analysis',
      displayName: 'Introduction to Statistical Analysis (MATH 2301)',
    };
  }

  // Level 2 Semester 4
  if (upper.includes('DATABASE') || upper.includes('BICT 2401') || upper.includes('BICT2401')) {
    return {
      id: 'bict-2401-database-systems',
      code: 'BICT 2401',
      name: 'Database Systems',
      displayName: 'Database Systems (BICT 2401)',
    };
  }
  if (upper.includes('HCI') || upper.includes('HUMAN COMPUTER INTERACTION') || upper.includes('HUMAN-COMPUTER INTERACTION') || upper.includes('BICT 2402') || upper.includes('BICT2402')) {
    return {
      id: 'bict-2402-human-computer-interaction',
      code: 'BICT 2402',
      name: 'Human-Computer Interaction',
      displayName: 'Human-Computer Interaction (BICT 2402)',
    };
  }
  if (upper.includes('MAD') || upper.includes('MOBILE APPLICATION') || upper.includes('BICT 2404') || upper.includes('BICT2404') || upper.includes('BICT2406')) {
    return {
      id: 'bict-2404-mobile-application-development',
      code: 'BICT 2404',
      name: 'Mobile Application Development',
      displayName: 'Mobile Application Development (BICT 2404)',
    };
  }
  if (upper.includes('SAD') || upper.includes('SYSTEMS ANALYSIS') || upper.includes('SYSTEM ANALYSIS') || upper.includes('BICT 2405') || upper.includes('BICT2405') || upper.includes('BICT 2403') || upper.includes('BICT2403')) {
    return {
      id: 'bict-2405-systems-analysis-and-design',
      code: 'BICT 2405',
      name: 'Systems Analysis and Design',
      displayName: 'Systems Analysis and Design (BICT 2405)',
    };
  }
  if (upper.includes('MULTIVARIATE CALCULUS') || upper.includes('MATH 2401') || upper.includes('MATH2401') || upper.includes('MATH 2402') || upper.includes('MATH2402')) {
    return {
      id: 'math-2401-multivariate-calculus',
      code: 'MATH 2401',
      name: 'Multivariate Calculus',
      displayName: 'Multivariate Calculus (MATH 2401)',
    };
  }

  // Level 3 Semester 5
  if (upper.includes('BICT3501') || upper.includes('BICT 3501') || upper.includes('NETWORKS II')) {
    return {
      code: 'BICT 3501',
      name: 'Computer Networks II',
      displayName: 'Computer Networks II (BICT 3501)',
    };
  }
  if (upper.includes('BICT3502') || upper.includes('BICT 3502') || upper.includes('REARCH METHODS') || upper.includes('RESEARCH METHODS')) {
    return {
      code: 'BICT 3502',
      name: 'Research Methods',
      displayName: 'Research Methods (BICT 3502)',
    };
  }
  if (upper.includes('BICT3503') || upper.includes('BICT 3503') || upper.includes('ALGORITHMS')) {
    return {
      code: 'BICT 3503',
      name: 'Algorithms and Data Structures',
      displayName: 'Algorithms and Data Structures (BICT 3503)',
    };
  }
  if (upper.includes('BICT3504') || upper.includes('BICT 3504') || upper.includes('MOBILE TELECOM')) {
    return {
      code: 'BICT 3504',
      name: 'Mobile Telecommunications',
      displayName: 'Mobile Telecommunications (BICT 3504)',
    };
  }
  if (upper.includes('BICT3505') || upper.includes('BICT 3505') || upper.includes('WEB PROGRAMMING')) {
    return {
      code: 'BICT 3505',
      name: 'Web Programming',
      displayName: 'Web Programming (BICT 3505)',
    };
  }

  // Level 3 Semester 6
  if (upper.includes('BICT3601') || upper.includes('BICT 3601') || upper.includes('OBJECT ORIENTED ANALYSIS') || upper.includes('OOAD')) {
    return {
      code: 'BICT 3601',
      name: 'Object-Oriented Analysis and Design',
      displayName: 'Object-Oriented Analysis and Design (BICT 3601)',
    };
  }
  if (upper.includes('BICT3602') || upper.includes('BICT 3602') || upper.includes('C++')) {
    return {
      code: 'BICT 3602',
      name: 'Object-Oriented Programming in C++',
      displayName: 'Object-Oriented Programming in C++ (BICT 3602)',
    };
  }
  if (upper.includes('BICT3603') || upper.includes('BICT 3603') || upper.includes('DISTRIBUTED SYSTEM')) {
    return {
      code: 'BICT 3603',
      name: 'Distributed Systems',
      displayName: 'Distributed Systems (BICT 3603)',
    };
  }
  if (upper.includes('BICT3605') || upper.includes('BICT 3605') || upper.includes('PROJECT MANAGEMENT')) {
    return {
      code: 'BICT 3605',
      name: 'Project Management',
      displayName: 'Project Management (BICT 3605)',
    };
  }

  // Level 4
  if (upper.includes('SOFTWARE ENGINEERING') || upper.includes('BICT 4701') || upper.includes('BICT4701')) {
    return {
      code: 'BICT 4701',
      name: 'Software Engineering',
      displayName: 'Software Engineering (BICT 4701)',
    };
  }
  if (upper.includes('MODELLING AND SIMULATION') || upper.includes('MODELING') || upper.includes('BICT 4702') || upper.includes('BICT4702')) {
    return {
      code: 'BICT 4702',
      name: 'Modelling and Simulation',
      displayName: 'Modelling and Simulation (BICT 4702)',
    };
  }
  if (upper.includes('NETWORK ADMINISTRATION') || upper.includes('BICT 4703') || upper.includes('BICT4703')) {
    return {
      code: 'BICT 4703',
      name: 'Network Administration and Information Security',
      displayName: 'Network Administration and Information Security (BICT 4703)',
    };
  }
  if (upper.includes('ENTREPRENEURSHIP') || upper.includes('BICT 4704') || upper.includes('BICT4704') || upper.includes('BISC 4702')) {
    return {
      code: 'BICT 4704',
      name: 'Entrepreneurship',
      displayName: 'Entrepreneurship (BICT 4704)',
    };
  }
  if (upper.includes('IS AUDIT') || upper.includes('INFORMATION SYSTEMS AUDIT') || upper.includes('BICT 4705') || upper.includes('BICT4705')) {
    return {
      code: 'BICT 4705',
      name: 'Information Systems Audit',
      displayName: 'Information Systems Audit (BICT 4705)',
    };
  }
  if (upper.includes('PAST PAPERS') || upper === 'PAST PAPERS') {
    return {
      code: 'General',
      name: 'Level 4 Examination Archive',
      displayName: 'Level 4 Examination Archive',
    };
  }

  // Fallback general parsing
  const codeMatch = clean.match(/^([A-Z]{3,4}\s*\d{4})/i);
  if (codeMatch) {
    const rawCode = codeMatch[1].replace(/([A-Z]+)(\d+)/, '$1 $2').toUpperCase();
    const rest = clean.replace(codeMatch[0], '').trim();
    if (rest) {
      const name = toPaperWords(rest);
      return { code: rawCode, name, displayName: `${name} (${rawCode})` };
    }
    return { code: rawCode, name: rawCode, displayName: rawCode };
  }

  const name = toPaperWords(clean);
  return { code: 'General', name, displayName: name };
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
    description: 'Operating systems, Java programming, computer networks, database systems, and systems analysis.',
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
    semesters: ['Semester 7'],
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
      if (semUpper.includes('ONE') || semUpper.includes('SEMESTER 1') || semUpper === 'SEM 1') {
        semesterName = 'Semester 1';
      } else if (semUpper.includes('TWO') || semUpper.includes('SEMESTER 2') || semUpper === 'SEM 2') {
        semesterName = 'Semester 2';
      } else if (semUpper.includes('SEMESTER 3') || semUpper.includes('SEM 3')) {
        semesterName = 'Semester 3';
      } else if (semUpper.includes('SEMESTER 4') || semUpper.includes('SEM 4')) {
        semesterName = 'Semester 4';
      } else if (semUpper.includes('SEMESTER 5') || semUpper.includes('SEM 5')) {
        semesterName = 'Semester 5';
      } else if (semUpper.includes('SEMESTER 6') || semUpper.includes('SEM 6')) {
        semesterName = 'Semester 6';
      } else if (semUpper.includes('SEMESTER 7') || semUpper.includes('SEM 7')) {
        semesterName = 'Semester 7';
      } else if (semUpper.includes('SEMESTER 8') || semUpper.includes('SEM 8')) {
        semesterName = 'Semester 8';
      }

      // Ensure Level 1 Semester 2 has MATH 1201 (Calculus)
      if (lvl.id === 'level-1' && semesterName === 'Semester 2' && !coursesMap.has('math-1201')) {
        coursesMap.set('math-1201', {
          id: 'math-1201',
          code: 'MATH 1201',
          name: 'Calculus',
          displayName: 'Calculus (MATH 1201)',
          semester: 'Semester 2',
          levelId: 'level-1',
          materialCounts: { notes: 0, pastPapers: 0, tutorials: 0, books: 0, outlines: 0, total: 0 },
          materials: { notes: [], pastPapers: [], tutorials: [], books: [], outlines: [] },
        });
      }

      // Ensure Level 4 has all 5 official courses pre-registered
      if (lvl.id === 'level-4') {
        const l4Courses = [
          { id: 'software-engineering', code: 'BICT 4701', name: 'Software Engineering', displayName: 'Software Engineering (BICT 4701)' },
          { id: 'modelling-and-simulation', code: 'BICT 4702', name: 'Modelling and Simulation', displayName: 'Modelling and Simulation (BICT 4702)' },
          { id: 'network-administrationand-information-security', code: 'BICT 4703', name: 'Network Administration and Information Security', displayName: 'Network Administration and Information Security (BICT 4703)' },
          { id: 'entrepreneurship', code: 'BICT 4704', name: 'Entrepreneurship', displayName: 'Entrepreneurship (BICT 4704)' },
          { id: 'is-audit', code: 'BICT 4705', name: 'Information Systems Audit', displayName: 'Information Systems Audit (BICT 4705)' }
        ];
        for (const l4 of l4Courses) {
          if (!coursesMap.has(l4.id)) {
            coursesMap.set(l4.id, {
              id: l4.id,
              code: l4.code,
              name: l4.name,
              displayName: l4.displayName,
              semester: 'Semester 7',
              levelId: 'level-4',
              materialCounts: { notes: 0, pastPapers: 0, tutorials: 0, books: 0, outlines: 0, total: 0 },
              materials: { notes: [], pastPapers: [], tutorials: [], books: [], outlines: [] },
            });
          }
        }
      }

      const courseFolders = fs.readdirSync(semPath, { withFileTypes: true });

      for (const courseEntry of courseFolders) {
        // Handle COURSE OUTLINES folder (Level 1): Re-allocate outlines to respective courses
        if (courseEntry.isDirectory() && courseEntry.name.toUpperCase() === 'COURSE OUTLINES') {
          const fullDir = path.join(semPath, courseEntry.name);
          const files = fs.readdirSync(fullDir, { withFileTypes: true });
          for (const f of files) {
            if (!f.isFile() || f.name.startsWith('.') || f.name.startsWith('~')) continue;
            const fullF = path.join(fullDir, f.name);
            const stat = fs.statSync(fullF);
            const fileSize = formatBytes(stat.size);
            const ext = path.extname(f.name).replace('.', '').toUpperCase() || 'FILE';
            const paperWords = toPaperWords(f.name);
            const relFromPublic = path.relative(publicDir, fullF).replace(/\\/g, '/');
            const urlParts = relFromPublic.split('/').map((s) => encodeURIComponent(s));
            const downloadUrl = '/' + urlParts.join('/');

            globalCounter++;
            let targetCourseId = 'math-1201';
            const fLow = f.name.toLowerCase();
            if (fLow.includes('architecture')) targetCourseId = 'computer-architerchiture-organisation';
            else if (fLow.includes('multimedia')) targetCourseId = 'multimedia';
            else if (fLow.includes('pc')) targetCourseId = 'pc-maintenance';
            else if (fLow.includes('calculus') || fLow.includes('math1201')) targetCourseId = 'math-1201';

            const targetCourse = coursesMap.get(targetCourseId) || coursesMap.get('math-1201');
            if (targetCourse) {
              let baseSlug = makeSlug(targetCourse.id + '-' + paperWords);
              if (!baseSlug) baseSlug = 'mat-' + globalCounter;
              let slug = baseSlug;
              let dup = 1;
              while (seenSlugs.has(slug)) {
                slug = baseSlug + '-' + dup;
                dup++;
              }
              seenSlugs.add(slug);

              targetCourse.materials.outlines.push({
                id: 'mat-' + globalCounter,
                slug,
                title: paperWords,
                fileName: f.name,
                fileType: ext,
                fileSize,
                downloadUrl,
                filePath: relFromPublic,
                category: 'course-outlines',
                categoryLabel: 'Course Outlines',
                subfolder: '',
              });
              targetCourse.materialCounts.outlines++;
              targetCourse.materialCounts.total++;
            }
          }
          continue; // Do NOT create a Course Outlines course!
        }

        // Handle PAST PAPERS folder (Level 4): Split & Re-allocate papers to their specific courses!
        if (courseEntry.isDirectory() && (courseEntry.name.toUpperCase() === 'PAST PAPERS' || courseEntry.name.toLowerCase() === 'past papers')) {
          const fullDir = path.join(semPath, courseEntry.name);
          function walkPastPapers(dir) {
            const files = fs.readdirSync(dir, { withFileTypes: true });
            for (const f of files) {
              const fullF = path.join(dir, f.name);
              if (f.isDirectory()) {
                walkPastPapers(fullF);
              } else if (f.isFile() && !f.name.startsWith('.') && !f.name.startsWith('~')) {
                const stat = fs.statSync(fullF);
                const fileSize = formatBytes(stat.size);
                const ext = path.extname(f.name).replace('.', '').toUpperCase() || 'FILE';
                const paperWords = toPaperWords(f.name);
                const relFromPublic = path.relative(publicDir, fullF).replace(/\\/g, '/');
                const urlParts = relFromPublic.split('/').map((s) => encodeURIComponent(s));
                const downloadUrl = '/' + urlParts.join('/');

                const fLow = f.name.toLowerCase();
                let targetId = 'software-engineering';
                if (fLow.includes('4701') || fLow.includes('software')) targetId = 'software-engineering';
                else if (fLow.includes('4702') || fLow.includes('model') || fLow.includes('simulation') || fLow.includes('preview-9781292281476')) targetId = 'modelling-and-simulation';
                else if (fLow.includes('4703') || fLow.includes('network') || fLow.includes('admin') || fLow.includes('security') || fLow.includes('scanned-image')) targetId = 'network-administrationand-information-security';
                else if (fLow.includes('4705') || fLow.includes('audit')) targetId = 'is-audit';
                else if (fLow.includes('4704') || fLow.includes('4804') || fLow.includes('3505') || fLow.includes('3604') || fLow.includes('4803') || fLow.includes('bisc') || fLow.includes('entrepren')) targetId = 'entrepreneurship';

                const targetCourse = coursesMap.get(targetId);
                if (targetCourse) {
                  globalCounter++;
                  let baseSlug = makeSlug(targetId + '-' + paperWords);
                  if (!baseSlug) baseSlug = 'mat-' + globalCounter;
                  let slug = baseSlug;
                  let dup = 1;
                  while (seenSlugs.has(slug)) {
                    slug = baseSlug + '-' + dup;
                    dup++;
                  }
                  seenSlugs.add(slug);

                  targetCourse.materials.pastPapers.push({
                    id: 'mat-' + globalCounter,
                    slug,
                    title: paperWords,
                    fileName: f.name,
                    fileType: ext,
                    fileSize,
                    downloadUrl,
                    filePath: relFromPublic,
                    category: 'past-papers',
                    categoryLabel: 'Past Papers',
                    subfolder: '',
                  });
                  targetCourse.materialCounts.pastPapers++;
                  targetCourse.materialCounts.total++;
                }
              }
            }
          }
          walkPastPapers(fullDir);
          continue; // Do NOT create an Archive course!
        }

        // Could be a course folder or direct loose file
        if (courseEntry.isDirectory()) {
          const rawFolderName = courseEntry.name;
          const meta = resolveCourseMeta(rawFolderName, lvl.id, semesterName);
          const courseId = meta.id || makeSlug(rawFolderName);

          if (!coursesMap.has(courseId)) {
            coursesMap.set(courseId, {
              id: courseId,
              code: meta.code,
              name: meta.name,
              displayName: meta.displayName,
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
          // Do NOT create a dummy course. Attach as course outline to relevant semester courses!
          if (
            courseEntry.name.startsWith('.') ||
            courseEntry.name === 'Thumbs.db' ||
            courseEntry.name.endsWith('.tmp')
          ) {
            continue;
          }
          const fullF = path.join(semPath, courseEntry.name);
          const stat = fs.statSync(fullF);
          const fileSize = formatBytes(stat.size);
          const ext = path.extname(courseEntry.name).replace('.', '').toUpperCase() || 'FILE';
          const paperWords = toPaperWords(courseEntry.name);
          const relFromPublic = path.relative(publicDir, fullF).replace(/\\/g, '/');
          const urlParts = relFromPublic.split('/').map((s) => encodeURIComponent(s));
          const downloadUrl = '/' + urlParts.join('/');

          // Attach to Semester 1 courses as an outline so it can be previewed/downloaded without being a course
          const sem1CourseIds = ['bict-1101', 'bict-1102', 'bict1103', 'comm1101', 'math1101'];
          for (const cId of sem1CourseIds) {
            const courseObj = coursesMap.get(cId);
            if (courseObj) {
              globalCounter++;
              let baseSlug = makeSlug(cId + '-' + paperWords);
              if (!baseSlug) baseSlug = 'mat-' + globalCounter;
              let slug = baseSlug;
              let dup = 1;
              while (seenSlugs.has(slug)) {
                slug = baseSlug + '-' + dup;
                dup++;
              }
              seenSlugs.add(slug);

              courseObj.materials.outlines.push({
                id: 'mat-' + globalCounter,
                slug,
                title: paperWords,
                fileName: courseEntry.name,
                fileType: ext,
                fileSize,
                downloadUrl,
                filePath: relFromPublic,
                category: 'course-outlines',
                categoryLabel: 'Course Outlines',
                subfolder: '',
              });
              courseObj.materialCounts.outlines++;
              courseObj.materialCounts.total++;
            }
          }
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
