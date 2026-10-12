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
      { title: 'About MUISA', href: '/about' },
      { title: 'Constitution & Bylaws', href: '/about#constitution' },
      { title: 'Patron & Faculty Advisors', href: '/about#patron' },
    ],
  },
  {
    title: 'Updates',
    href: '/updates',
    dropdownItems: [
      { title: 'Top Events & News', href: '/updates' },
      { title: 'Event Calendar', href: '/updates#calendar' },
      { title: 'Photo Gallery', href: '/updates#gallery' },
    ],
  },
  {
    title: 'Resources',
    href: '/resources',
    dropdownItems: [
      {
        title: 'All Resources',
        href: '/resources',
        description: 'Overview of all available learning materials.',
      },
      {
        title: 'Past Papers',
        href: '/resources/past-papers',
        description: 'Previous examination papers for practice.',
      },
      {
        title: 'Lecture Notes',
        href: '/resources/notes',
        description: 'Notes to support classroom learning.',
      },
      {
        title: 'Books & E-books',
        href: '/resources/books',
        description: 'Recommended academic reading materials.',
      },
      {
        title: 'Course Outlines',
        href: '/resources/course-outlines',
        description: 'Course topics and learning objectives.',
      },
      {
        title: 'Tutorials',
        href: '/resources/tutorials',
        description: 'Practical guides, coding lessons, and learning materials.',
      },
    ],
  },
  {
    title: 'Executive',
    href: '/executive',
    dropdownItems: [
      { title: 'Current Executive Board', href: '/executive' },
      { title: 'Sub-Committees', href: '/executive#committees' },
      { title: 'Alumni & Past Leaders', href: '/executive#alumni' },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];
