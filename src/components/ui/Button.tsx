'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const sizeClasses = {
  sm: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  md: 'px-7 py-3.5 text-sm rounded-2xl gap-2.5',
  lg: 'px-9 py-4.5 text-base rounded-2xl gap-3',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  onClick,
  disabled = false,
  type = 'button',
  className,
  icon,
  iconPosition = 'right',
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    sizeClasses[size],
    variant === 'primary' && [
      'text-white hover:-translate-y-0.5 hover:shadow-glow-lg',
    ],
    variant === 'secondary' && [
      'text-white/70 hover:text-white bg-white/5 border border-white/8',
      'hover:bg-white/8 hover:border-white/15',
    ],
    variant === 'ghost' && [
      'text-white/50 hover:text-white hover:bg-white/5',
    ],
    variant === 'outline' && [
      'text-white/70 hover:text-white border border-white/15 hover:border-white/30',
      'hover:bg-white/3',
    ],
    className
  );

  const gradientStyle =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)' }
      : {};

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          style={gradientStyle}
          whileTap={{ scale: 0.97 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <Link href={href} className={baseClasses} style={gradientStyle}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      style={gradientStyle}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {content}
    </motion.button>
  );
}
