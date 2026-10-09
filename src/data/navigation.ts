import { NavItem } from '../types';

export const topBarContact = {
  phone: '+265 (0) 884 288 849',
  phoneHref: 'tel:+265884288849',
  email: 'mzuniictsa@gmail.com',
  emailHref: 'mailto:mzuniictsa@gmail.com',
  ctaText: 'JOIN MUISA',
  ctaHref: '/join',
};

export const siteIdentity = {
  name: 'MUISA',
  fullName: 'Mzuzu University ICT Students Association',
  tagline: 'Shaping the Future Through Digital Innovation and Impact.',
  institution: 'Mzuzu University, Malawi',
};

export const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
    dropdownItems: [
      { title: 'About MUISA', href: '/about', description: 'Our history, mission, vision, and core values.' },
      { title: 'Constitution & Bylaws', href: '/about#constitution', description: 'Official operational guidelines and governing charter.' },
      { title: 'Patron & Faculty Advisors', href: '/about#patron', description: 'Department leadership and academic advisors.' },
    ],
  },
  {
    title: 'Updates',
    href: '/updates',
    dropdownItems: [
      { title: 'Top Events & News', href: '/updates', description: 'Latest stories, announcements, and press releases.' },
      { title: 'Event Calendar', href: '/updates#calendar', description: 'Upcoming workshops, hackathons, and webinars.' },
      { title: 'Photo Gallery', href: '/updates#gallery', description: 'Moments and memories from past student activities.' },
    ],
  },
  {
    title: 'Resources',
    href: '/resources',
    dropdownItems: [
      { title: 'Academic Past Papers', href: '/resources?cat=past-papers', description: 'Mid-semester and end of semester examination papers.' },
      { title: 'Books & Lecture Notes', href: '/resources?cat=notes', description: 'Recommended textbooks, slides, and study notes.' },
      { title: 'Course Outlines', href: '/resources?cat=outlines', description: 'Syllabus and grading schemes across semesters.' },
      { title: 'Developer Tutorials', href: '/resources?cat=tutorials', description: 'Guides for Web, Mobile, Data, AI, and Networking.' },
    ],
  },
  {
    title: 'Executive',
    href: '/executive',
    dropdownItems: [
      { title: 'Current Executive Board', href: '/executive', description: 'Meet the 2026/2027 MUISA student leaders.' },
      { title: 'Sub-Committees', href: '/executive#committees', description: 'Technical, Welfare, and Media working teams.' },
      { title: 'Alumni & Past Leaders', href: '/executive#alumni', description: 'Recognizing leadership cohorts of previous years.' },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];
