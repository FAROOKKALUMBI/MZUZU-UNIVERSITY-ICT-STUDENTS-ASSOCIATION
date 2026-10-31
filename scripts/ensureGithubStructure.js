import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const resourcesDir = path.join(publicDir, 'RESOURCES');

if (!fs.existsSync(resourcesDir)) {
  console.error('RESOURCES directory not found in public!');
  process.exit(1);
}

const structure = [
  {
    level: 'LEVEL 1',
    title: 'Level 1 (First Year Undergraduate)',
    description: 'Foundations of ICT, programming concepts, computer architecture, and discrete mathematics.',
    semesters: [
      {
        folder: 'SEMESTER ONE',
        title: 'Semester 1 (First Year)',
        courses: [
          { folder: 'BICT 1101', code: 'BICT 1101', name: 'End-User Computing' },
          { folder: 'BICT 1102', code: 'BICT 1102', name: 'Introduction to Programming' },
          { folder: 'BICT1103', code: 'BICT 1103', name: 'Computer and Communication Technology' },
          { folder: 'COMM1101', code: 'COMM 1101', name: 'Communication Skills I' },
          { folder: 'MATH1101', code: 'MATH 1101', name: 'Precalculus' },
        ],
      },
      {
        folder: 'SEMESTER TWO',
        title: 'Semester 2 (First Year)',
        courses: [
          { folder: 'COMM1201', code: 'COMM 1201', name: 'Communication Skills II' },
          { folder: 'COMPUTER ARCHITERCHITURE & ORGANISATION', code: 'BICT 1202', name: 'Computer Architecture and Organisation' },
          { folder: 'COURSE OUTLINES', code: 'General', name: 'Course Outlines & Curricula' },
          { folder: 'MULTIMEDIA', code: 'BICT 1203', name: 'Multimedia Systems' },
          { folder: 'PC MAINTENANCE', code: 'BICT 1201', name: 'PC Management and Maintenance' },
        ],
      },
    ],
  },
  {
    level: 'LEVEL 2',
    title: 'Level 2 (Second Year Undergraduate)',
    description: 'Intermediate computing, operating systems, Java programming, database systems, and systems analysis.',
    semesters: [
      {
        folder: 'SEMESTER 3',
        title: 'Semester 3 (Second Year)',
        courses: [
          { folder: 'COMPUTER NETWORKS I', code: 'BICT 2303', name: 'Computer Networks I' },
          { folder: 'INTRO. TO STATISTICAL ANALYSIS', code: 'MATH 2301', name: 'Introduction to Statistical Analysis' },
          { folder: 'java prep', code: 'BICT 2302', name: 'Programming in Java (Prep & Exercises)' },
          { folder: 'OPERATING SYSTEM', code: 'BICT 2301', name: 'Operating Systems' },
          { folder: 'PROGRAMMING IN JAVA', code: 'BICT 2302', name: 'Programming in Java' },
          { folder: 'STATISTICS', code: 'MATH 2301', name: 'Statistics & Probability' },
          { folder: 'WEB DESIGN', code: 'BICT 2304', name: 'Web Design' },
        ],
      },
      {
        folder: 'SEMESTER 4',
        title: 'Semester 4 (Second Year)',
        courses: [
          { folder: 'Database', code: 'BICT 2401', name: 'Database Systems' },
          { folder: 'HCI', code: 'BICT 2402', name: 'Human-Computer Interaction' },
          { folder: 'HCI END SEM PREP', code: 'BICT 2402', name: 'Human-Computer Interaction (Exam Prep)' },
          { folder: 'MAD', code: 'BICT 2404', name: 'Mobile Application Development' },
          { folder: 'Multivariate Calculus', code: 'MATH 2401', name: 'Multivariate Calculus' },
          { folder: 'SAD', code: 'BICT 2405', name: 'Systems Analysis and Design' },
        ],
      },
    ],
  },
  {
    level: 'LEVEL 3',
    title: 'Level 3 (Third Year Undergraduate)',
    description: 'Advanced networking, mobile telecoms, object-oriented design, web programming, and distributed systems.',
    semesters: [
      {
        folder: 'SEMESTER 5',
        title: 'Semester 5 (Third Year)',
        courses: [
          { folder: 'BICT3501 COMPUTER NETWORKS II', code: 'BICT 3501', name: 'Computer Networks II' },
          { folder: 'BICT3502 REARCH METHODS', code: 'BICT 3502', name: 'Research Methods' },
          { folder: 'BICT3503 ALGORITHMS AND DATA STRUCTUCTURES', code: 'BICT 3503', name: 'Algorithms and Data Structures' },
          { folder: 'BICT3504 MOBILE TELECOMMUNICATIONS', code: 'BICT 3504', name: 'Mobile Telecommunications' },
          { folder: 'BICT3505 WEB PROGRAMMING', code: 'BICT 3505', name: 'Web Programming' },
        ],
      },
      {
        folder: 'SEMESTER 6',
        title: 'Semester 6 (Third Year)',
        courses: [
          { folder: 'BICT3601 Object oriented analysis and design', code: 'BICT 3601', name: 'Object-Oriented Analysis and Design' },
          { folder: 'BICT3602 C++', code: 'BICT 3602', name: 'Object-Oriented Programming in C++' },
          { folder: 'BICT3603 Distributed system', code: 'BICT 3603', name: 'Distributed Systems' },
          { folder: 'BICT3605 Project Management', code: 'BICT 3605', name: 'Project Management' },
        ],
      },
    ],
  },
  {
    level: 'LEVEL 4',
    title: 'Level 4 (Fourth Year Undergraduate)',
    description: 'Software engineering, modelling & simulation, network security, IT audit, and entrepreneurship.',
    semesters: [
      {
        folder: 'SEMESTER 7',
        title: 'Semester 7 (Fourth Year)',
        courses: [
          { folder: 'ENTREPRENEURSHIP', code: 'BICT 4704', name: 'Entrepreneurship' },
          { folder: 'IS AUDIT', code: 'BICT 4705', name: 'Information Systems Audit' },
          { folder: 'MODELLING AND SIMULATION', code: 'BICT 4702', name: 'Modelling and Simulation' },
          { folder: 'NETWORK ADMINISTRATIONAND INFORMATION SECURITY', code: 'BICT 4703', name: 'Network Administration and Information Security' },
          { folder: 'Past Papers', code: 'General', name: 'Examination Archive' },
          { folder: 'SOFTWARE ENGINEERING', code: 'BICT 4701', name: 'Software Engineering' },
        ],
      },
    ],
  },
];

for (const lvl of structure) {
  const levelPath = path.join(resourcesDir, lvl.level);
  if (!fs.existsSync(levelPath)) fs.mkdirSync(levelPath, { recursive: true });

  // Level .gitkeep & README
  fs.writeFileSync(path.join(levelPath, '.gitkeep'), '', 'utf-8');
  fs.writeFileSync(
    path.join(levelPath, 'README.md'),
    `# ${lvl.title}\n\n${lvl.description}\n\n## Semesters Included\n${lvl.semesters.map((s) => `- [${s.title}](./${encodeURIComponent(s.folder)})`).join('\n')}\n\n---\n*Explore full course notes, past exams, and tutorials on the [MUISA Resources Portal](/resources).*`,
    'utf-8'
  );

  for (const sem of lvl.semesters) {
    const semPath = path.join(levelPath, sem.folder);
    if (!fs.existsSync(semPath)) fs.mkdirSync(semPath, { recursive: true });

    // Semester .gitkeep & README
    fs.writeFileSync(path.join(semPath, '.gitkeep'), '', 'utf-8');
    fs.writeFileSync(
      path.join(semPath, 'README.md'),
      `# ${sem.title}\n\nAcademic materials and modules for ${sem.title}.\n\n## Courses\n${sem.courses.map((c) => `- **${c.code}**: [${c.name}](./${encodeURIComponent(c.folder)})`).join('\n')}\n\n---\n*Explore full course notes, past exams, and tutorials on the [MUISA Resources Portal](/resources).*`,
      'utf-8'
    );

    for (const crs of sem.courses) {
      const crsPath = path.join(semPath, crs.folder);
      if (!fs.existsSync(crsPath)) fs.mkdirSync(crsPath, { recursive: true });

      // Course .gitkeep & README
      fs.writeFileSync(path.join(crsPath, '.gitkeep'), '', 'utf-8');
      fs.writeFileSync(
        path.join(crsPath, 'README.md'),
        `# ${crs.name} (${crs.code})\n\n**Level**: ${lvl.level} | **Semester**: ${sem.folder}\n\nCurated lecture notes, past examination papers, tutorials, lab exercises, and reference e-books for ${crs.name}.\n\n---\n*Access, preview, and download all materials online on the [MUISA Resources Portal](/resources).*`,
        'utf-8'
      );
    }
  }
}

console.log('Successfully created all .gitkeep and README.md files for GitHub repository tree structure!');
