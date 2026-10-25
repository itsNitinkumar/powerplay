'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-[#FF385C] text-white hover:bg-[#E31C5F] active:bg-[#c91953] font-semibold rounded-lg',
  secondary:
    'bg-white text-[#222] border border-[#DDDDDD] hover:bg-[#F7F7F7] font-semibold rounded-lg',
  ghost:
    'bg-transparent text-[#222] hover:bg-[#F7F7F7] rounded-lg',
  outline:
    'bg-transparent text-[#222] border border-[#222] hover:bg-[#222] hover:text-white font-semibold rounded-lg',
  link:
    'bg-transparent text-[#222] underline hover:no-underline p-0',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C] disabled:opacity-50 disabled:cursor-not-allowed select-none';
    return (
      <button
        ref={ref}
        className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
