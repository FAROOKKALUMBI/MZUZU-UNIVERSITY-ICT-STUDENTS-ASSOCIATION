import { FooterColumn } from '../types';

export const footerAbout = {
  title: 'About',
  description: 'MUISA — Mzuzu University ICT Student Association.\nShaping the future through digital innovation and impact.',
  socials: [
    { name: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
    { name: 'X', href: 'https://twitter.com', icon: 'Twitter' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
    { name: 'YouTube', href: 'https://youtube.com', icon: 'Youtube' },
  ],
};

export const footerColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Updates', href: '/updates' },
      { label: 'Academic Resources', href: '/resources' },
      { label: 'Executives', href: '/executive' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Past Papers', href: '/resources?cat=past-papers' },
      { label: 'Books', href: '/resources?cat=books' },
      { label: 'Notes', href: '/resources?cat=notes' },
      { label: 'Course Outlines', href: '/resources?cat=outlines' },
      { label: 'Tutorials', href: '/resources?cat=tutorials' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Join MUISA', href: '/join' },
      { label: 'Events', href: '/updates#events' },
      { label: 'Trainings', href: '/updates#trainings' },
      { label: 'Projects', href: '/about#projects' },
      { label: 'Opportunities', href: '/updates#opportunities' },
    ],
  },
];

export const footerCopyright = {
  text: '© 2026 Mzuzu University ICT Student Association. All rights reserved.',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
