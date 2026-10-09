import { UpdateItem } from '../types';

export const mosaicImages = [
  {
    id: 1,
    src: '/images/mosaic-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    alt: 'MUISA students in computer lab training session',
    isTall: true,
  },
  {
    id: 2,
    src: '/images/mosaic-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    alt: 'Executive board strategy meeting',
    isTall: false,
  },
  {
    id: 3,
    src: '/images/mosaic-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    alt: 'ICT students coding collaboratively',
    isTall: false,
  },
  {
    id: 4,
    src: '/images/mosaic-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    alt: 'Student testing software prototypes',
    isTall: false,
  },
  {
    id: 5,
    src: '/images/mosaic-5.jpg',
    fallback: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    alt: 'Students analyzing tech project documentation',
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
    thumbnail: '/images/thumb-1.jpg',
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
    thumbnail: '/images/thumb-2.jpg',
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
    thumbnail: '/images/thumb-3.jpg',
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
    thumbnail: '/images/thumb-4.jpg',
  },
];
