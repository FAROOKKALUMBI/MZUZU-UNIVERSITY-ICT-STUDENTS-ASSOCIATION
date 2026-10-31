import vaultJson from './vaultHierarchy.json';

export type MaterialCategoryKey = 'notes' | 'pastPapers' | 'tutorials' | 'books' | 'outlines';

export interface MaterialItem {
  id: string;
  slug: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  filePath: string;
  category: string;
  categoryLabel: string;
  subfolder?: string;
}

export interface MaterialCounts {
  notes: number;
  pastPapers: number;
  tutorials: number;
  books: number;
  outlines: number;
  total: number;
}

export interface CourseData {
  id: string; // slug, e.g. 'bict-1101'
  code: string; // e.g. 'BICT 1101'
  name: string; // e.g. 'End-User Computing'
  displayName?: string; // e.g. 'End-User Computing (BICT 1101)'
  semester: string; // 'Semester 1' or 'Semester 2'
  levelId: string; // 'level-1' | 'level-2' | 'level-3' | 'level-4'
  materialCounts: MaterialCounts;
  materials: {
    notes: MaterialItem[];
    pastPapers: MaterialItem[];
    tutorials: MaterialItem[];
    books: MaterialItem[];
    outlines: MaterialItem[];
  };
}

export interface LevelData {
  id: string; // 'level-1' | 'level-2' | 'level-3' | 'level-4'
  number: number;
  name: string; // 'Level 1'
  yearTitle: string; // 'First Year'
  description: string;
  semesters: string[];
  totalCourses: number;
  totalMaterials: number;
  courses: CourseData[];
}

export interface MaterialTypeMeta {
  key: MaterialCategoryKey;
  urlSlug: string;
  title: string;
  shortName: string;
  description: string;
  badge: string;
}

export const MATERIAL_TYPES: MaterialTypeMeta[] = [
  {
    key: 'notes',
    urlSlug: 'notes',
    title: 'Lecture Notes',
    shortName: 'Notes',
    description: 'Curated lecture slides, chapter summaries, and class modules.',
    badge: 'Study Notes',
  },
  {
    key: 'pastPapers',
    urlSlug: 'past-papers',
    title: 'Past Examination Papers',
    shortName: 'Past Papers',
    description: 'End of semester examinations, mid-term tests, and practice papers.',
    badge: 'Exam Practice',
  },
  {
    key: 'tutorials',
    urlSlug: 'tutorials',
    title: 'Tutorials & Assignments',
    shortName: 'Tutorials',
    description: 'Practical lab manuals, coding exercises, assignments, and walkthroughs.',
    badge: 'Hands-on',
  },
  {
    key: 'books',
    urlSlug: 'books',
    title: 'Books & E-books',
    shortName: 'Books',
    description: 'Recommended academic textbooks and reference reading materials.',
    badge: 'Reading List',
  },
  {
    key: 'outlines',
    urlSlug: 'course-outlines',
    title: 'Course Outlines',
    shortName: 'Outlines',
    description: 'Official course topics, syllabi, grading criteria, and learning outcomes.',
    badge: 'Syllabus',
  },
];

export const vaultLevels: LevelData[] = vaultJson as LevelData[];

// Normalize material type slug to key
export function normalizeTypeSlug(slug?: string | null): MaterialTypeMeta | undefined {
  if (!slug) return undefined;
  const clean = decodeURIComponent(slug).toLowerCase().trim().replace(/[-_\s]+/g, '');
  
  if (clean.includes('outline') || clean.includes('syllab')) {
    return MATERIAL_TYPES.find((t) => t.key === 'outlines');
  }
  if (clean.includes('pastpaper') || clean.includes('exam')) {
    return MATERIAL_TYPES.find((t) => t.key === 'pastPapers');
  }
  if (clean.includes('tutorial') || clean.includes('assign') || clean.includes('lab') || clean.includes('code')) {
    return MATERIAL_TYPES.find((t) => t.key === 'tutorials');
  }
  if (clean.includes('book') || clean.includes('textbook')) {
    return MATERIAL_TYPES.find((t) => t.key === 'books');
  }
  if (clean.includes('note') || clean.includes('lecture') || clean.includes('slide')) {
    return MATERIAL_TYPES.find((t) => t.key === 'notes');
  }

  return MATERIAL_TYPES.find(
    (t) =>
      t.urlSlug.replace(/[-_\s]+/g, '') === clean ||
      t.key.toLowerCase() === clean ||
      t.shortName.toLowerCase().replace(/[-_\s]+/g, '') === clean
  );
}

// Find level by id (accepts 'level-1', 'level 1', 'level1', '1', 'LEVEL 1', etc.)
export function getLevel(levelId?: string): LevelData | undefined {
  if (!levelId) return undefined;
  const decoded = decodeURIComponent(levelId).toLowerCase().trim();
  const clean = decoded.replace(/[-_\s]+/g, '');
  const numMatch = decoded.match(/\d+/);
  const num = numMatch ? parseInt(numMatch[0], 10) : null;

  return vaultLevels.find(
    (l) =>
      l.id === decoded ||
      l.id.replace(/[-_\s]+/g, '') === clean ||
      `level-${l.number}` === decoded ||
      `level${l.number}` === clean ||
      (num !== null && l.number === num)
  );
}

// Find course by level and courseId
export function getCourse(levelId?: string, courseId?: string): CourseData | undefined {
  const lvl = getLevel(levelId);
  if (!lvl || !courseId) return undefined;
  const decoded = decodeURIComponent(courseId).toLowerCase().trim();
  const cleanCourse = decoded.replace(/[-_\s]+/g, '');

  return lvl.courses.find(
    (c) =>
      c.id === decoded ||
      c.id.replace(/[-_\s]+/g, '') === cleanCourse ||
      c.code.toLowerCase() === decoded ||
      c.code.toLowerCase().replace(/[-_\s]+/g, '') === cleanCourse ||
      (c.displayName && c.displayName.toLowerCase().includes(decoded))
  );
}

// Global search across all levels, courses, and materials
export interface SearchResultItem {
  material: MaterialItem;
  level: LevelData;
  course: CourseData;
  typeMeta: MaterialTypeMeta;
}

export function searchAllMaterials(query: string, maxResults = 30): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  for (const lvl of vaultLevels) {
    for (const course of lvl.courses) {
      for (const meta of MATERIAL_TYPES) {
        const items = course.materials[meta.key] || [];
        for (const mat of items) {
          if (
            mat.title.toLowerCase().includes(q) ||
            mat.fileName.toLowerCase().includes(q) ||
            course.name.toLowerCase().includes(q) ||
            course.code.toLowerCase().includes(q) ||
            (course.displayName && course.displayName.toLowerCase().includes(q)) ||
            (mat.subfolder && mat.subfolder.toLowerCase().includes(q))
          ) {
            results.push({
              material: mat,
              level: lvl,
              course,
              typeMeta: meta,
            });
            if (results.length >= maxResults) return results;
          }
        }
      }
    }
  }

  return results;
}
