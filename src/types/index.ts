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
  paperTitle?: string;
  fileName?: string;
  filePath?: string;
  folderHint?: string;
  folderName?: string;
  folderCategory?: string;
  category: 'past-papers' | 'books' | 'notes' | 'lecture-notes' | 'outlines' | 'course-outlines' | 'tutorials';
  programme?: string;
  programmeName?: string;
  courseCode?: string;
  courseName?: string;
  courseDisplayName?: string;
  year: string;
  semester: string;
  fileSize: string;
  fileType: string;
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
