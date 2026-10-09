import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { mainNavItems, siteIdentity } from '../../data/navigation';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change or click outside
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-md' : 'border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          {/* Logo & Tagline (Left) */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="MUISA Logo"
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="hidden sm:block border-l border-gray-300 pl-3">
              <span className="block text-[11px] font-medium text-gray-500 leading-tight max-w-[210px]">
                {siteIdentity.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Right) */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
              const isDropdownOpen = openDropdown === item.title;

              return (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.title)}
                  onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                >
                  {hasDropdown ? (
                    <div className="flex items-center">
                      <Link
                        to={item.href}
                        className={`text-[13.5px] font-semibold tracking-normal transition-all duration-150 rounded-full flex items-center gap-1 px-3.5 py-1.5 ${
                          active
                            ? 'bg-gray-100 text-gray-900 font-bold'
                            : 'text-gray-700 hover:text-[#1B6B35] hover:bg-gray-50'
                        }`}
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          size={14}
                          className={`text-gray-500 transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180 text-[#1B6B35]' : ''
                          }`}
                        />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-[13.5px] font-semibold tracking-normal transition-all duration-150 rounded-full px-4 py-1.5 ${
                        active
                          ? 'bg-gray-100 text-gray-900 font-bold'
                          : 'text-gray-700 hover:text-[#1B6B35] hover:bg-gray-50'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {hasDropdown && isDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                        {item.dropdownItems?.map((drop) => (
                          <Link
                            key={drop.title}
                            to={drop.href}
                            className="block px-4 py-2.5 hover:bg-gray-50 text-left transition-colors duration-150 group"
                          >
                            <div className="text-xs font-bold text-gray-900 group-hover:text-[#1B6B35]">
                              {drop.title}
                            </div>
                            {drop.description && (
                              <div className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {drop.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={mainNavItems}
        currentPath={location.pathname}
      />
    </>
  );
};
