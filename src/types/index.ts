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
  title: string;
  category: 'past-papers' | 'books' | 'notes' | 'outlines' | 'tutorials';
  year: string;
  semester: string;
  courseCode: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
