import { HeroSlideData } from '../types';

/**
 * Hero Slides Configuration
 * -------------------------
 * To swap or add new hero slides anytime:
 * 1. Drop your images in `/public/images/hero/` as `slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`, `slide-4.jpg`, etc.
 * 2. Update the titles/CTAs below as desired.
 */
export const heroSlides: HeroSlideData[] = [
  {
    id: 1,
    title: 'Mzuzu University\nICT Students Association.',
    subtitle: 'Shaping the Future Through\nDigital Innovation and Impact.',
    image: '/images/hero/slide-1.jpg',
    primaryCta: {
      text: 'JOIN MUISA',
      href: '/join',
    },
    secondaryCta: {
      text: 'EXPLORE UPDATES',
      href: '/updates',
    },
  },
  {
    id: 2,
    title: 'Empowering Next-Gen\nTechnology Leaders.',
    subtitle: 'Fostering practical software engineering,\nnetworking, and cybersecurity excellence.',
    image: '/images/hero/slide-2.jpg',
    primaryCta: {
      text: 'EXPLORE RESOURCES',
      href: '/resources',
    },
    secondaryCta: {
      text: 'OUR EXECUTIVE',
      href: '/executive',
    },
  },
  {
    id: 3,
    title: 'Modern Computing Labs\n& Digital Infrastructure.',
    subtitle: 'Providing state-of-the-art workstations\nand resources for academic computing.',
    image: '/images/hero/slide-3.jpg',
    primaryCta: {
      text: 'ACADEMIC RESOURCES',
      href: '/resources',
    },
    secondaryCta: {
      text: 'ABOUT MUISA',
      href: '/about',
    },
  },
  {
    id: 4,
    title: 'Hands-on Hackathons\n& Collaborative Coding.',
    subtitle: 'Building real-world digital solutions\nfor community and industrial impact.',
    image: '/images/hero/slide-4.jpg',
    primaryCta: {
      text: 'JOIN MUISA',
      href: '/join',
    },
    secondaryCta: {
      text: 'LATEST EVENTS',
      href: '/updates',
    },
  },
];
