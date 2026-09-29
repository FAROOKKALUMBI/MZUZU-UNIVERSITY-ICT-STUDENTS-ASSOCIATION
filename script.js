/**
 * MUISA / ICTSA Navigation Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primaryNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');

  // 1. Sticky Navbar shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('active');
    navToggle.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    navBackdrop.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => toggleMenu());
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMenu(false));
  }

  // 3. Dropdown Toggles (especially for mobile & touch)
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const parentItem = toggle.closest('.dropdown');
      const isOpen = parentItem.classList.contains('open');

      // Close all other open dropdowns
      document.querySelectorAll('.dropdown.open').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('open');
          const btn = item.querySelector('.dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current dropdown
      parentItem.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', !isOpen);
      e.stopPropagation();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(item => {
        item.classList.remove('open');
        const btn = item.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 4. Close mobile drawer when clicking regular links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        toggleMenu(false);
      }
    });
  });

  // 5. Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMenu(false);
      document.querySelectorAll('.dropdown.open').forEach(item => {
        item.classList.remove('open');
        const btn = item.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
