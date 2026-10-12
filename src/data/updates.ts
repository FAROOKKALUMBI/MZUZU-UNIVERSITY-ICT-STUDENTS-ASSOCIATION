import { UpdateItem } from '../types';

export interface MosaicCardItem {
  id: string;
  updateId: string;
  title: string;
  category: string;
  badgeBg: string;
  time: string;
  src: string;
  fallback: string;
  alt: string;
  isTall: boolean;
}

export const mosaicCards: MosaicCardItem[] = [
  {
    id: 'm-1',
    updateId: '1',
    title: 'MUISA Launches A New Era Of Digital Innovation At Mzuzu University',
    category: 'INNOVATION',
    badgeBg: 'bg-blue-600',
    time: '30 Mins Ago',
    src: '/images/mosaic-1.jpg?v=2',
    fallback: '/images/who-are-we.jpg?v=2',
    alt: 'MUISA students in classroom tech workshop',
    isTall: true,
  },
  {
    id: 'm-2',
    updateId: '2',
    title: 'ICT Students Turn Ideas Into Real-World Technology Solutions',
    category: 'PROJECTS',
    badgeBg: 'bg-[#1B6B35]',
    time: '45 Mins Ago',
    src: '/images/mosaic-2.jpg?v=2',
    fallback: '/images/hero/slide-4.jpg?v=2',
    alt: 'Students coding in university computer lab',
    isTall: false,
  },
  {
    id: 'm-3',
    updateId: '3',
    title: 'MUISA Empowers Students Through Practical ICT Training',
    category: 'TRAINING',
    badgeBg: 'bg-sky-600',
    time: '2 Weeks Ago',
    src: '/images/mosaic-3.jpg?v=2',
    fallback: '/images/hero/slide-1.jpg?v=2',
    alt: 'ICT students coding with laptop',
    isTall: false,
  },
  {
    id: 'm-4',
    updateId: '4',
    title: 'Students Explore Innovation And Entrepreneurship Through MUISA',
    category: 'STARTUPS',
    badgeBg: 'bg-rose-600',
    time: '3 Months Ago',
    src: '/images/mosaic-4.jpg?v=2',
    fallback: '/images/hero/slide-2.jpg?v=2',
    alt: 'Student tech team working on prototypes',
    isTall: false,
  },
  {
    id: 'm-5',
    updateId: '5',
    title: 'State-of-the-Art Computer Lab & High-Speed Network Upgraded',
    category: 'LABS',
    badgeBg: 'bg-indigo-600',
    time: '1 Month Ago',
    src: '/images/mosaic-5.jpg?v=2',
    fallback: '/images/hero/slide-3.jpg?v=2',
    alt: 'University computer lab workstations',
    isTall: false,
  },
];

export const topUpdates: UpdateItem[] = [
  {
    id: '1',
    number: '01',
    title: 'MUISA Launches A New Era Of Digital Innovation At Mzuzu University',
    relativeTime: '30 Mins Ago',
    date: 'October 8, 2026',
    category: 'Innovation',
    readTime: '3 min read',
    author: 'MUISA Media Team',
    summary: 'Mzuzu University ICT Students Association officially unveiled its strategic roadmap for modern software development labs, student mentorship accelerators, and regional hackathon partnerships.',
    content: `The Mzuzu University ICT Students Association (MUISA) has kicked off an ambitious new innovation agenda aimed at equipping undergraduates with market-ready digital skills.

Speaking at the launch in the Mzuni ICT Auditorium, executive leaders outlined new initiatives including peer-to-peer coding bootcamps, automated exam repositories, and direct industry placement programs with top tech firms across Malawi and the SADC region.

"Our goal is not just academic passing, but fostering technologists who can build solutions addressing real community challenges in health, education, fintech, and agriculture," noted the MUISA President.`,
    thumbnail: '/images/thumb-1.jpg?v=2',
  },
  {
    id: '2',
    number: '02',
    title: 'ICT Students Turn Ideas Into Real-World Technology Solutions',
    relativeTime: '45 Mins Ago',
    date: 'October 8, 2026',
    category: 'Projects',
    readTime: '4 min read',
    author: 'Academic Affairs Desk',
    summary: 'From solar-powered campus iot monitoring to mobile healthcare record systems, MUISA developers showcased innovative final-year and extracurricular software projects.',
    content: `During the quarterly Tech Exhibition, student teams presented working prototypes built using modern web stacks, IoT microcontrollers, and mobile frameworks.

Faculty members and invited tech leaders praised the practical depth of the projects, with three teams receiving incubation sponsorships for further commercialization.`,
    thumbnail: '/images/thumb-2.jpg?v=2',
  },
  {
    id: '3',
    number: '03',
    title: 'MUISA Empowers Students Through Practical ICT Training',
    relativeTime: '2 Weeks Ago',
    date: 'September 24, 2026',
    category: 'Training',
    readTime: '5 min read',
    author: 'Welfare & Training Desk',
    summary: 'A 5-day hands-on technical workshop covered Full-Stack Web Development with React and Node.js, Linux server administration, and Git version control fundamentals.',
    content: `Over 120 first- and second-year ICT students participated in the intensive weekend bootcamps held at the University Computer Lab.

Participants received free study packs, cheat sheets, and certificates of completion upon submitting their capstone group applications.`,
    thumbnail: '/images/thumb-3.jpg?v=2',
  },
  {
    id: '4',
    number: '04',
    title: 'Students Explore Innovation And Entrepreneurship Through MUISA',
    relativeTime: '3 months Ago',
    date: 'July 15, 2026',
    category: 'Entrepreneurship',
    readTime: '3 min read',
    author: 'PR Committee',
    summary: 'A panel session featuring Mzuzu University tech alumni who founded local software agencies provided invaluable insight into tech entrepreneurship in Malawi.',
    content: `Alumni founders shared candid experiences on pitching to investors, registering businesses in Malawi, managing software client contracts, and navigating freelancing in the global digital economy.`,
    thumbnail: '/images/thumb-4.jpg?v=2',
  },
  {
    id: '5',
    number: '05',
    title: 'State-of-the-Art Computer Lab & High-Speed Network Upgraded',
    relativeTime: '1 Month Ago',
    date: 'September 10, 2026',
    category: 'Facilities',
    readTime: '4 min read',
    author: 'Technical Committee',
    summary: 'Department of ICT modernizes main laboratory infrastructure with 50+ new high-speed workstations, Gigabit local network, and developer server clusters.',
    content: `In partnership with campus ICT Directorate, MUISA coordinated the hardware refresh of the departmental computing lab.

Students now enjoy faster compilation speeds, isolated sandbox network environments for cybersecurity exercises, and dedicated power backups.`,
    thumbnail: '/images/mosaic-5.jpg?v=2',
  },
];
