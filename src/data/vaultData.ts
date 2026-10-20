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
  name: string; // e.g. 'BICT 1101'
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
  const clean = slug.toLowerCase();
  return MATERIAL_TYPES.find(
    (t) => t.urlSlug === clean || t.key.toLowerCase() === clean || t.shortName.toLowerCase() === clean
  );
}

// Find level by id
export function getLevel(levelId?: string): LevelData | undefined {
  if (!levelId) return undefined;
  const clean = levelId.toLowerCase();
  return vaultLevels.find((l) => l.id === clean || `level-${l.number}` === clean || `level${l.number}` === clean);
}

// Find course by level and courseId
export function getCourse(levelId?: string, courseId?: string): CourseData | undefined {
  const lvl = getLevel(levelId);
  if (!lvl || !courseId) return undefined;
  const cleanCourse = courseId.toLowerCase();
  return lvl.courses.find((c) => c.id === cleanCourse || c.code.toLowerCase() === cleanCourse);
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
            course.code.toLowerCase().includes(q) ||
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
