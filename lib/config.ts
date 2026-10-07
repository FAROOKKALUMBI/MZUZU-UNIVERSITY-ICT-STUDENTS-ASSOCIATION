export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string; description?: string }[];
}

export interface HeroSlideData {
  id: number;
  slideNumber: string;
  headingLine1: string;
  headingLine2: string;
  subheadingLine1: string;
  subheadingLine2: string;
  bgImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export const siteConfig = {
  name: "Mzuzu University ICT Student Association",
  shortName: "MUISA",
  motto: "Shaping the future through digital innovation and impact.",
  tagline: {
    line1: "Shaping the Future Through",
    line2: "Digital Innovation and Impact.",
  },
  description:
    "Mzuzu University ICT Student Association (MUISA) is a student-driven ICT community dedicated to building technical skills, fostering collaboration, creating real-world projects, and connecting students to meaningful opportunities. We empower ICT students through practical learning, transformative events, innovation, entrepreneurship, and professional development—helping them build skills, portfolios, and experience before graduation.",
  contact: {
    phone: "+265 (0) 884 288 849",
    phoneHref: "tel:+265884288849",
    email: "info@senga.systems",
    emailHref: "mailto:info@senga.systems",
    location: "Mzuzu University, Luwinga, Mzuzu, Malawi",
  },
  navigation: [
    {
      label: "Home",
      href: "/",
      hasDropdown: false,
    },
    {
      label: "About",
      href: "/about",
      hasDropdown: true,
      dropdownItems: [
        { label: "About MUISA", href: "/about" },
        { label: "Our Mission & Vision", href: "/about#vision" },
        { label: "Constitution & Governance", href: "/about#governance" },
        { label: "Departments", href: "/about#departments" },
      ],
    },
    {
      label: "Updates",
      href: "/updates",
      hasDropdown: true,
      dropdownItems: [
        { label: "All Updates", href: "/updates" },
        { label: "Events & Workshops", href: "/updates/events" },
        { label: "News & Announcements", href: "/updates/news" },
        { label: "Hackathons", href: "/updates/events#hackathons" },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      hasDropdown: true,
      dropdownItems: [
        { label: "Academic Resources", href: "/resources" },
        { label: "Past Exam Papers", href: "/resources/past-papers" },
        { label: "Books & Literature", href: "/resources/books" },
        { label: "Lecture Notes", href: "/resources/notes" },
        { label: "Course Outlines", href: "/resources/course-outlines" },
        { label: "Tutorials & Guides", href: "/resources/tutorials" },
      ],
    },
    {
      label: "Executive",
      href: "/executives",
      hasDropdown: true,
      dropdownItems: [
        { label: "Executive Committee", href: "/executives" },
        { label: "Department Heads", href: "/executives#departments" },
        { label: "Advisors & Patrons", href: "/executives#advisors" },
        { label: "Alumni Network", href: "/executives#alumni" },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      hasDropdown: true,
      dropdownItems: [
        { label: "Get in Touch", href: "/contact" },
        { label: "Location & Office", href: "/contact#location" },
        { label: "Support & Helpdesk", href: "/contact#support" },
      ],
    },
  ] as NavItem[],
  heroSlides: [
    {
      id: 1,
      slideNumber: "01",
      headingLine1: "Mzuzu University",
      headingLine2: "ICT Students Association.",
      subheadingLine1: "Shaping the Future Through",
      subheadingLine2: "Digital Innovation and Impact.",
      bgImage: "/images/hero-reference.png",
      primaryCtaText: "JOIN MUISA",
      primaryCtaLink: "/join",
      secondaryCtaText: "EXPLORE UPDATES",
      secondaryCtaLink: "/updates",
    },
    {
      id: 2,
      slideNumber: "02",
      headingLine1: "Mzuzu University",
      headingLine2: "ICT Students Association.",
      subheadingLine1: "Shaping the Future Through",
      subheadingLine2: "Digital Innovation and Impact.",
      bgImage: "/images/hero-reference.png",
      primaryCtaText: "JOIN MUISA",
      primaryCtaLink: "/join",
      secondaryCtaText: "EXPLORE UPDATES",
      secondaryCtaLink: "/updates",
    },
    {
      id: 3,
      slideNumber: "03",
      headingLine1: "Learn. Collaborate. Build.",
      headingLine2: "Empowering Next-Gen Innovators.",
      subheadingLine1: "Practical Skills, Hackathons &",
      subheadingLine2: "Real-World Software Engineering.",
      bgImage: "/images/hero-reference.png",
      primaryCtaText: "JOIN MUISA",
      primaryCtaLink: "/join",
      secondaryCtaText: "ACADEMIC RESOURCES",
      secondaryCtaLink: "/resources",
    },
    {
      id: 4,
      slideNumber: "04",
      headingLine1: "Creating Impact Through",
      headingLine2: "Digital Innovation & Research.",
      subheadingLine1: "Connecting ICT Students to",
      subheadingLine2: "Global Tech Industry Opportunities.",
      bgImage: "/images/hero-reference.png",
      primaryCtaText: "BECOME A MEMBER",
      primaryCtaLink: "/join",
      secondaryCtaText: "MEET EXECUTIVES",
      secondaryCtaLink: "/executives",
    },
  ] as HeroSlideData[],
};
