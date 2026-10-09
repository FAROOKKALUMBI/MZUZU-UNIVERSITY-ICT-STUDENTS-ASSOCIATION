import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { footerAbout, footerColumns, footerCopyright } from '../../data/footer';

export const Footer: React.FC = () => {
  const renderSocialIcon = (iconName: string) => {
    const size = 16;
    switch (iconName) {
      case 'Facebook':
        return <Facebook size={size} />;
      case 'Twitter':
        return <Twitter size={size} />;
      case 'Linkedin':
        return <Linkedin size={size} />;
      case 'Youtube':
        return <Youtube size={size} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#1B6B35] text-white pt-14 pb-8 border-t border-green-800/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-green-800/70">
          {/* Col 1: About (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white/95">
              {footerAbout.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm whitespace-pre-line">
              {footerAbout.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {footerAbout.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MUISA on ${social.name}`}
                  className="w-8 h-8 rounded-full bg-green-800/80 hover:bg-[#F5B83D] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2, 3, 4: Link Columns (7 cols total -> approx 2.3 each) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold tracking-wider text-white">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs text-white/75">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="hover:text-[#F5B83D] transition-colors duration-150 inline-block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <p className="text-center sm:text-left">{footerCopyright.text}</p>
          <div className="flex items-center gap-6">
            {footerCopyright.legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
