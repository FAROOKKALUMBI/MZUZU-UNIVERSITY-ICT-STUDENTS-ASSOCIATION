# MUISA (Mzuzu University ICT Student Association) — Comprehensive Architecture & Implementation Blueprint

**Source & Version:** MUISA Constitution Version 1.0 (Adopted 7 June 2026) + Research Phase Blueprint  
**Primary Visual Source:** Attached Reference Screenshot (Hero, Contact Bar, Navigation, Slider)

---

## 1. Core Identity & Official Copy (Constitution v1.0)

| Attribute | Official Specification |
|---|---|
| **Official Name** | Mzuzu University ICT Student Association (MUISA) |
| **Short Name** | MUISA |
| **Official Motto** | *"Shaping the future through digital innovation and impact."* |
| **Tagline** | Line 1: *"Shaping the Future Through"* <br> Line 2: *"Digital Innovation and Impact."* |
| **Core Philosophy** | **Learn. Build. Connect.** (The MUISA Standard: *"Are we building?"*) |
| **Vision** | *"To be the leading student-driven ICT community in Malawi producing skilled, innovative, and entrepreneurial graduates who create real impact through technology."* |
| **Mission** | *"MUISA exists to build technical skills, foster collaboration, organise transformative trainings and events, develop real-world projects, promote innovation and entrepreneurship, connect students to professional opportunities, help members build portfolios and experience, and represent Mzuzu University ICT students with professionalism, integrity, and excellence."* |
| **Organization Description** | *"Mzuzu University ICT Student Association (MUISA) is a student-driven ICT community dedicated to building technical skills, fostering collaboration, creating real-world projects, and connecting students to meaningful opportunities. We empower ICT students through practical learning, transformative events, innovation, entrepreneurship, and professional development—helping them build skills, portfolios, and experience before graduation."* |

---

## 2. Master Navigation & Route Map

### Public Website
- **`/` (Home):**
  1. Top Contact Bar (Green `#0B6B35` + Blue accent line `#1684C7` + Phone, Email, Yellow CTA)
  2. Main White Navigation with Tagline Wordmark & Dropdown Menus
  3. Hero Section (Green-tint overlay, university ICT lab photo, high-contrast headings, CTA buttons, "02" slider indicator)
  4. Who We Are / About Intro
  5. Vision & Mission Cards
  6. What We Do (8 Core Objectives: Skills, Collaboration, Events, Projects, Innovation, Opportunities, Portfolios, Representation)
  7. The MUISA Standard (*"Are we building?"*)
  8. Latest Updates (Events & News)
  9. Academic Resources (Past Papers, Books, Notes, Outlines, Tutorials)
  10. Build with MUISA (Student Innovation & Projects)
  11. Learn • Collaborate • Build (Trainings, Workshops, Hackathons, Seminars)
  12. Connect with Opportunities (Internships, Jobs, Mentorship, Networks)
  13. Leadership / Meet the Executives
  14. Membership & "Why Join MUISA?"
  15. Final CTA & Get in Touch / Contact Section
  16. Footer with quick links, university recognition statement & copyright.
- **`/about` (About Us):** Who We Are, Vision, Mission, Objectives, Core Values, Constitution.
- **`/updates` (Updates Hub):**
  - `/updates/events` & `/updates/events/[slug]` (Hackathons, Workshops, Seminars)
  - `/updates/news` & `/updates/news/[slug]` (Announcements, Achievements, Articles)
- **`/resources` (Academic Resources Hub):**
  - `/resources/past-papers` (Filtered by Programme, Year, Semester, Course)
  - `/resources/books` (Textbooks, Reference Material)
  - `/resources/notes` (Lecture Notes, Slide Summaries)
  - `/resources/course-outlines` (Curriculum outlines)
  - `/resources/tutorials` (Programming, Web, AI, Cybersecurity, Networking, UI/UX)
- **`/executives` (Executive Board):** President, Secretary, Treasurer, Tech Lead, Cybersecurity Lead, Training Coordinator, Event Coordinator, PR/Social Media Officer, Project Manager, Social Welfare Officer.
- **`/contact` (Contact & Helpdesk):** Office location, direct phone, official email, contact form.
- **`/join` (Membership Registration):** Student ID, programme, year, interest areas, password.
- **`/login` (Portal Login):** Student & Admin authentication.

### Student Portal (`/student`)
- `/student/dashboard`: Quick statistics, upcoming registered events, active membership status, certificates.
- `/student/profile`: Skills, interests, GitHub/LinkedIn links, portfolio projects.
- `/student/membership`: Digital membership card with QR verification (`/verify/member/[id]`).
- `/student/events`: Registered events, workshop check-ins.
- `/student/resources`: Saved and downloaded academic materials.
- `/student/certificates`: Issued certificates of participation with verification QR (`/verify/certificate/[token]`).
- `/student/notifications`: Broadcast announcements, application updates.
- `/student/settings`: Account credentials, profile preferences.

### Admin Dashboard (`/admin`)
- `/admin/dashboard`: Metrics (Total members, upcoming events, news articles, resources).
- `/admin/students`: Member directory, approvals, status management.
- `/admin/memberships`: Application reviews, renewals, payment refs.
- `/admin/executives`: Executive profiles, order index, active status per academic year.
- `/admin/events`: Event creation, check-in QR scanner, attendance tracking, certificate generation.
- `/admin/news`: CMS for articles (Draft, Scheduled, Published, Archived).
- `/admin/resources`: Upload & moderation pipeline for Past Papers, Books, Notes, Course Outlines, Tutorials.
- `/admin/messages`: Contact form submissions and inquiries.
- `/admin/media`: Cloudinary / R2 asset browser.
- `/admin/users`: Role-based access control (Super Admin, Executive, Content Editor, Webmaster).
- `/admin/settings`: Site configuration, audit logs.

---

## 3. Technology Stack & Integrations

| Layer | Technology | Key Implementation |
|---|---|---|
| **Frontend** | **Next.js 15 (App Router)** | Static rendering + Server Components + dynamic routes |
| **Language** | **TypeScript** | Strict type safety across UI, API, and DB layers |
| **Styling** | **Tailwind CSS** | Custom MUISA palette (`#0B6B35`, `#07552A`, `#F6D365`, `#1684C7`) |
| **UI Components** | **shadcn/ui + Lucide React** | Reusable, accessible UI primitives and icons |
| **Backend & API** | **Next.js Server Actions & Route Handlers** | Type-safe backend handlers |
| **ORM & Database** | **Prisma ORM + PostgreSQL** | Relational data schema (Students, Memberships, Events, Resources, etc.) |
| **Authentication** | **Auth.js (NextAuth v5)** | Role-based authentication (Student, Executive, Admin) |
| **File Storage** | **Cloudflare R2 / AWS S3** | Academic PDFs, past papers, notes, certificate PDFs |
| **Image Hosting** | **Cloudinary** | Optimized responsive image transformations |
| **Email Service** | **Resend** | Membership confirmation, QR tickets, certificates, contact form |
| **Form Handling** | **React Hook Form + Zod** | Client-side & server-side schema validation |
| **Hosting** | **Vercel** | Edge runtime, zero-config deployment |

---

## 4. Database Schema Structure (`prisma/schema.prisma`)

- `User`: Base credentials, role (`STUDENT`, `EXECUTIVE`, `ADMIN`, `SUPER_ADMIN`), relationships.
- `Student`: Registration number, programme of study, year, department, bio, socials.
- `Membership`: Academic year, status (`PENDING`, `ACTIVE`, `EXPIRED`, `SUSPENDED`), payment reference.
- `Executive`: Position, department, academic year, order index, active flag.
- `Event` & `EventAttendee`: Date, venue, capacity, slug, registration, check-in status.
- `News`: Article slug, markdown/rich content, status (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
- `Resource` & `ResourceCategory`: Types (`PAST_PAPER`, `BOOK`, `NOTE`, `COURSE_OUTLINE`, `TUTORIAL`), course code, year, semester, download counter.
- `ContactMessage`: Form submissions, isRead state.
- `Notification`: Target user notifications.
- `Media`: File URL, publicId, MIME type, dimensions.
- `SiteSetting`: Key-value configuration for live editable site values.
- `AuditLog`: Action tracking for admin auditing.

---

## 5. Development Roadmap & Phasing

- [x] **Phase 1 — Visual Foundation & Homepage:**
  - Pixel-perfect recreation of reference screenshot (TopBar, Navbar, Hero with green overlay and slider indicators).
  - Centralized site configuration (`lib/config.ts`).
  - Prisma schema architecture (`prisma/schema.prisma`).
  - Production build verification (`npm run build`).
- [ ] **Phase 2 — Core Public Pages:**
  - `/about` (Constitution, Vision, Mission, Objectives).
  - `/updates` (`/events` and `/news` with slug detail pages).
  - `/resources` (`/past-papers`, `/books`, `/notes`, `/course-outlines`, `/tutorials` with search & filter).
  - `/executives` (Executive board directory).
  - `/contact` (Interactive contact form with validation).
  - `/join` (Student registration form).
- [ ] **Phase 3 — Database & Authentication Layer:**
  - Connect PostgreSQL with Prisma client (`lib/db.ts`).
  - Configure Auth.js session handling, middleware protection for `/student/*` and `/admin/*`.
  - File upload endpoints with Cloudflare R2 / Cloudinary.
- [ ] **Phase 4 — Student Portal & Admin CMS:**
  - Student profile, digital membership card with QR verification, resource downloads, event registrations.
  - Admin content management, member approvals, resource publishing pipeline, event check-in & certificates.
