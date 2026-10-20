import { ResourceItem } from '../types';
import resourcesData from './resourcesData.json';

export interface ProgrammeInfo {
  id: string; // slug, e.g., 'computer-science'
  name: string; // e.g., 'Computer Science'
  shortCode: string; // e.g., 'CS'
  description: string;
}

export interface CategoryInfo {
  id: string; // slug, e.g., 'past-papers'
  name: string; // e.g., 'Past Papers'
  badge: string;
  description: string;
}

export const RESOURCE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'past-papers',
    name: 'Past Papers',
    badge: 'Exam Practice',
    description: 'Previous examination papers and tests for practice.',
  },
  {
    id: 'lecture-notes',
    name: 'Lecture Notes',
    badge: 'Study Notes',
    description: 'Curated notes and slides to support classroom learning.',
  },
  {
    id: 'books',
    name: 'Books & E-books',
    badge: 'Reading List',
    description: 'Recommended academic textbooks and reference reading materials.',
  },
  {
    id: 'course-outlines',
    name: 'Course Outlines',
    badge: 'Syllabus',
    description: 'Official course topics, syllabi, grading schemes, and learning objectives.',
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    badge: 'Hands-on',
    description: 'Practical developer guides, coding lessons, lab manuals, and tutorials.',
  },
];

export const PROGRAMMES: ProgrammeInfo[] = [
  {
    id: 'computer-science',
    name: 'Computer Science',
    shortCode: 'BSc CS',
    description: 'Algorithms, artificial intelligence, computer architecture, data structures, and software engineering.',
  },
  {
    id: 'information-technology',
    name: 'Information Technology',
    shortCode: 'BSc IT',
    description: 'Networking, database administration, web development, cybersecurity, and cloud systems.',
  },
  {
    id: 'information-systems',
    name: 'Information Systems',
    shortCode: 'BSc IS',
    description: 'Enterprise IT, systems analysis, business analytics, IT project management, and information strategy.',
  },
  {
    id: 'programming',
    name: 'Programming & Coding Tutorials',
    shortCode: 'DEV',
    description: 'Hands-on coding bootcamps, language foundations (Python, Web, C, Java), and software tools.',
  },
];

export const academicResources: ResourceItem[] = resourcesData as ResourceItem[];
