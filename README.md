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
│   ├── images/              # High-resolution assets & portraits
│   │   ├── hero-reference.png
│   │   ├── who-are-we.jpg
│   │   ├── mosaic-1.jpg ... mosaic-5.jpg
│   │   ├── thumb-1.jpg ... thumb-4.jpg
│   │   └── exec-tawanda.jpg ... exec-esther.jpg
│   └── logo.svg             # Official MUISA vector crest & typography
├── src/
│   ├── assets/              # Static assets
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx          # Reusable button with variants & arrow icon
│   │   │   ├── SectionLabel.tsx    # Green label tab (e.g. "UPDATES →")
│   │   │   └── Modal.tsx           # Accessible modal with keyboard trap
│   │   ├── home/
│   │   │   ├── HeroSlider.tsx      # Full-width 4-slide carousel (6s auto-advance)
│   │   │   ├── WhoAreWe.tsx        # 2-column intro section
│   │   │   ├── UpdatesSection.tsx  # 5-image mosaic + Top Events list (01-04)
│   │   │   ├── JoinCTA.tsx         # Green membership callout card
│   │   │   ├── ExecutiveGrid.tsx   # 4x2 grid of portrait cards
│   │   │   └── ExecutiveModal.tsx  # Member bio & contact modal
│   │   └── layout/
│   │       ├── TopBar.tsx          # Green contact info + JOIN MUISA button
│   │       ├── Navbar.tsx          # Sticky navigation with dropdowns
│   │       ├── MobileMenu.tsx      # Slide-out responsive drawer
│   │       ├── Footer.tsx          # 4-column footer with social links
│   │       └── Layout.tsx          # App shell with scroll restoration
│   ├── data/
│   │   ├── navigation.ts    # Navbar links, dropdowns & contact details
│   │   ├── hero.ts          # Carousel slides content
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

# 4. Preview production build
npm run preview
```

---

## 🔄 How to Customize Content & Images

### 1. Swapping Executive Photos and Bios
Edit [`src/data/executives.ts`](file:///c:/Users/Trappie21%20Farook/Documents/GitHub/MUISA%20WEBSITE/src/data/executives.ts):
- Replace image paths in `/public/images/` or use direct URL links.
- Update `name`, `role`, `bio`, `department`, `yearOfStudy`, and `socials`.

### 2. Updating Top Events & News
Edit [`src/data/updates.ts`](file:///c:/Users/Trappie21%20Farook/Documents/GitHub/MUISA%20WEBSITE/src/data/updates.ts):
- Add or modify items in `topUpdates`.
- Replace thumbnails in `/public/images/` or mosaic images in `mosaicImages`.

### 3. Adding Examination Past Papers & Notes
Edit [`src/data/resources.ts`](file:///c:/Users/Trappie21%20Farook/Documents/GitHub/MUISA%20WEBSITE/src/data/resources.ts):
- Add new items with course codes, year, semester, and download link.

### 4. Modifying Navigation & Contact Details
Edit [`src/data/navigation.ts`](file:///c:/Users/Trappie21%20Farook/Documents/GitHub/MUISA%20WEBSITE/src/data/navigation.ts):
- Change phone numbers, email addresses, and navbar dropdown items.

---

## 📱 Responsive Breakpoints Tested

- **Mobile (360px – 640px)**: Collapsible hamburger menu, single-column executive cards, responsive photo mosaic and stacked CTA buttons.
- **Tablet (768px – 1024px)**: 2-column executive grid, 2-column Who Are We layout, adjusted typography.
- **Desktop (1280px+)**: Pixel-accurate 4-column executive layout, sticky navbar with dropdowns, 5-image mosaic grid, full 4-column footer.
