# MUISA / ICTSA Website Navigation

This project implements the navigation system for the **MUISA / ICTSA** portal.

## 🧭 Navigation Hierarchy

1. **Home** (`index.html`)
2. **About Us** (`#about` / `about.html`)
3. **Updates** *(Dropdown)*
   - 📅 **Events** (`#events` / `events.html`)
   - 📰 **News** (`#news` / `news.html`)
4. **Academic Resources** *(Dropdown)*
   - 📄 **Past Papers** (`#past-papers` / `past-papers.html`)
   - 📚 **Books** (`#books` / `books.html`)
   - 📝 **Notes** (`#notes` / `notes.html`)
   - 📋 **Course Outlines** (`#course-outlines` / `course-outlines.html`)
   - 💻 **Tutorials** (`#tutorials` / `tutorials.html`)
5. **Executives** (`#executives` / `executives.html`)
6. **Contact** (`#contact` / `contact.html`)
7. **Join ICTSA** *(Prominent high-visibility Call-To-Action button with glow & hover animations)*

---

## 📁 File Structure

```
MUISA WEBSITE/
├── index.html        # Main template containing semantic header & nav
├── style.css         # Modern styling, glassmorphism, dropdowns & responsive drawer
├── script.js         # Mobile drawer toggle, dropdown behavior, scroll effects
└── README.md         # Navigation structure documentation
```

## ✨ Features

- **Fully Responsive**: Desktop multi-tier dropdowns and animated mobile slide-in drawer.
- **Accessible (a11y)**: Complete ARIA roles, `aria-expanded`, keyboard `ESC` dismissal, and focus states.
- **Visual Polish**: Sticky glassmorphism header, smooth dropdown transitions, font icons, descriptive subtext, and gradient animated CTA button.
