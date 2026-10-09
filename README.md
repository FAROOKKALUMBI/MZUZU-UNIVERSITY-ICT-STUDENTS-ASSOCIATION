# MUISA — Mzuzu University ICT Students Association Website

A production-quality, responsive web platform built for the **Mzuzu University ICT Students Association (MUISA)**. Recreated with pixel precision from the official design system.

---

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/) (Multi-page SPA)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Inter (Google Fonts)](https://fonts.google.com/specimen/Inter)

---

## 🖼️ Hero Slider & Image Management

A dedicated folder is provided at **`/public/images/hero/`** to easily update the homepage carousel at any time:

```
public/images/hero/
├── slide-1.jpg   # Frame 1: Mzuzu University ICT Lab
├── slide-2.jpg   # Frame 2: Classroom & Laptop Workstations
├── slide-3.jpg   # Frame 3: Computer Lab Desktop Systems
└── slide-4.jpg   # Frame 4: Students Coding Session
```

- **Adding / Replacing Hero Images**: Simply place or overwrite files named `slide-1.jpg`, `slide-2.jpg`, etc. in `public/images/hero/`. The website will instantly reflect the changes!
- **Slide Transition Timing**: Configured to auto-advance from right to left every **3 seconds** (with interactive pagination controls and hover pause).
- **Titles & CTAs**: Editable directly in [`src/data/hero.ts`](file:///c:/Users/Trappie21%20Farook/Documents/GitHub/MUISA%20WEBSITE/src/data/hero.ts).

---

## 🎨 Design Tokens & Palette

| Token | Hex Value | Application |
|---|---|---|
| **Primary Green** | `#1B6B35` | Hero overlay, Footer, CTA Card, Headings, Section badges |
| **Dark Green** | `#155429` | Button active states, gradient backdrops |
| **Accent Gold** | `#F5B83D` | Primary CTA buttons, Executive roles, Member badges, Number accents |
| **Section Gray** | `#D9D9D9` | "Who Are We" background & "Join CTA" section background |
| **Dark Text** | `#1F2937` | Primary body typography & titles |
| **Button Radius** | `2px` | Sharp, sleek button corners |
| **Card Radius** | `12px` / `16px` (`rounded-xl` / `rounded-2xl`) | Executive portrait cards, CTA card, and lab photos |

---

## 📁 Project Structure

```
├── public/
│   ├── images/
│   │   ├── hero/            # Dedicated folder for hero carousel slides
│   │   │   ├── slide-1.jpg ... slide-4.jpg
│   │   ├── who-are-we.jpg
│   │   ├── mosaic-1.jpg ... mosaic-5.jpg
│   │   ├── thumb-1.jpg ... thumb-4.jpg
│   │   └── exec-tawanda.jpg ... exec-esther.jpg
│   └── logo.svg             # Official MUISA vector crest & typography
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx          # Reusable button with variants & arrow icon
│   │   │   ├── SectionLabel.tsx    # Green label tab (e.g. "UPDATES →")
│   │   │   └── Modal.tsx           # Accessible modal with keyboard trap
│   │   ├── home/
│   │   │   ├── HeroSlider.tsx      # Full-width 4-slide carousel (3s auto-advance)
│   │   │   ├── WhoAreWe.tsx        # 2-column intro section
│   │   │   ├── UpdatesSection.tsx  # 5-image mosaic + Top Events list (01-04)
│   │   │   ├── JoinCTA.tsx         # Green membership callout card
│   │   │   ├── ExecutiveGrid.tsx   # 4x2 grid of portrait cards
│   │   │   └── ExecutiveModal.tsx  # Member bio & contact modal
│   │   └── layout/
│   │       ├── TopBar.tsx          # Green contact info + JOIN MUISA button
│   │       ├── Navbar.tsx          # Sticky navigation with clean dropdowns
│   │       ├── MobileMenu.tsx      # Slide-out responsive drawer
│   │       ├── Footer.tsx          # 4-column footer with social links
│   │       └── Layout.tsx          # App shell with scroll restoration
│   ├── data/
│   │   ├── navigation.ts    # Clean navbar links, dropdowns & contact details
│   │   ├── hero.ts          # Carousel slides content & photo paths
│   │   ├── updates.ts       # News articles, thumbnails & mosaic config
│   │   ├── executives.ts    # Executive board profiles, bios & contacts
│   │   ├── resources.ts     # Past papers, books & notes archive
│   │   └── footer.ts        # Footer links & copyright
│   ├── pages/
│   │   ├── HomePage.tsx     # Full landing page matching screenshot
│   │   ├── AboutPage.tsx    # Mission, Vision, Core Values, Constitution
│   │   ├── UpdatesPage.tsx  # News hub, filtering, single article view
│   │   ├── ResourcesPage.tsx# Past exams, lecture notes, textbook downloads
│   │   ├── ExecutivePage.tsx# Executive board & committees
│   │   ├── ContactPage.tsx  # Contact form & department info
│   │   ├── JoinPage.tsx     # Student membership registration
│   │   └── NotFoundPage.tsx # 404 handler
│   ├── types/
│   │   └── index.ts         # TypeScript definitions
│   ├── App.tsx              # React Router configuration
│   ├── index.css            # Tailwind directives & custom scrollbars
│   └── main.tsx             # Application bootstrap
├── index.html               # HTML entry with Inter font
├── tailwind.config.js       # Color tokens, typography, and animation tokens
├── tsconfig.json            # Strict TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build optimized production bundle
npm run build
```
