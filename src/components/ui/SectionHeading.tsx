import { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  id?: string;
}

export function SectionHeading({ children, level = 2, className = '', id }: SectionHeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  const sizeMap: Record<number, string> = {
    1: 'text-2xl font-semibold',
    2: 'text-[22px] font-semibold',
    3: 'text-lg font-semibold',
    4: 'text-base font-semibold',
  };
  return (
    <Tag id={id} className={`text-[#222] leading-tight ${sizeMap[level]} ${className}`}>
      {children}
    </Tag>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return <hr className={`border-0 border-t border-[#DDDDDD] ${className}`} />;
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F7F7F7] text-[#222] ${className}`}
    >
      {children}
    </span>
  );
}
