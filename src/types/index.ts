export interface NavDropdownItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  dropdownItems?: NavDropdownItem[];
}

export interface HeroSlideData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export interface UpdateItem {
  id: string;
  number: string;
  title: string;
  relativeTime: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  thumbnail: string;
  readTime: string;
  author: string;
}

export interface ExecutiveMember {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  phone?: string;
  department: string;
  yearOfStudy: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ResourceItem {
  id: string;
  slug?: string;
  title: string;
  category: 'past-papers' | 'books' | 'notes' | 'lecture-notes' | 'outlines' | 'course-outlines' | 'tutorials';
  programme?: string; // e.g., 'computer-science' | 'information-technology' | 'information-systems' | 'programming'
  programmeName?: string; // e.g., 'Computer Science' | 'Information Technology' | 'Information Systems' | 'General ICT'
  courseCode: string;
  courseName?: string; // e.g., 'Introduction to Programming', 'Database Systems'
  year: string; // e.g., 'Year 1', 'Year 2', 'Year 3', 'Year 4'
  semester: string; // e.g., 'Semester 1', 'Semester 2'
  fileSize: string;
  fileType: string; // e.g., 'PDF', 'ZIP'
  downloadUrl: string;
  description?: string;
  authorOrLecturer?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
