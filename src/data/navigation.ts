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
      { title: 'Academic Past Papers', href: '/resources?cat=past-papers' },
      { title: 'Books & Lecture Notes', href: '/resources?cat=notes' },
      { title: 'Course Outlines', href: '/resources?cat=outlines' },
      { title: 'Tutorials', href: '/resources?cat=tutorials' },
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
