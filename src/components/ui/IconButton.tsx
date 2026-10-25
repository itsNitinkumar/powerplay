'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // aria-label for accessibility
  children: ReactNode;
  variant?: 'ghost' | 'circle' | 'circle-border';
  size?: 'sm' | 'md' | 'lg';
}

const variantMap: Record<string, string> = {
  ghost: 'rounded-lg hover:bg-[#F7F7F7]',
  circle: 'rounded-full bg-white hover:bg-[#F7F7F7] shadow-md',
  'circle-border': 'rounded-full border border-[#DDDDDD] hover:border-[#222] bg-white',
};

const sizeMap: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, children, variant = 'ghost', size = 'md', className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={`
          inline-flex items-center justify-center cursor-pointer
          transition-all duration-150 flex-shrink-0
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]
          disabled:opacity-40 disabled:cursor-not-allowed
          ${variantMap[variant]} ${sizeMap[size]} ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
