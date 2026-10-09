import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export type ButtonVariant = 'gold-filled' | 'gold-outlined' | 'green-filled' | 'white-outlined' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  to,
  variant = 'gold-filled',
  size = 'md',
  showArrow = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-[2px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    'gold-filled': 'bg-[#F5B83D] text-gray-950 hover:bg-[#e5aa32] focus:ring-[#F5B83D] shadow-sm active:scale-[0.99]',
    'gold-outlined': 'border-2 border-[#F5B83D] text-[#F5B83D] hover:bg-[#F5B83D]/15 focus:ring-[#F5B83D] active:scale-[0.99]',
    'green-filled': 'bg-[#1B6B35] text-white hover:bg-[#155429] focus:ring-[#1B6B35] shadow-sm active:scale-[0.99]',
    'white-outlined': 'border-2 border-white/80 text-white hover:bg-white/10 hover:border-white focus:ring-white active:scale-[0.99]',
    'ghost': 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (to) {
    const isExternal = to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:');
    if (isExternal) {
      return (
        <a href={to} className={combinedClasses} target={to.startsWith('http') ? '_blank' : undefined} rel={to.startsWith('http') ? 'noopener noreferrer' : undefined}>
          <span>{children}</span>
          {showArrow && <ArrowRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="transition-transform group-hover:translate-x-1" />}
        </a>
      );
    }
    return (
      <Link to={to} className={combinedClasses}>
        <span>{children}</span>
        {showArrow && <ArrowRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="transition-transform group-hover:translate-x-1" />}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span>{children}</span>
      {showArrow && <ArrowRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="transition-transform group-hover:translate-x-1" />}
    </button>
  );
};
