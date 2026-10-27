import React from 'react';
import { icons } from '@/data/icons';

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function Icon({ name, className, tag = 'span', style, ...rest }: IconProps) {
  const Tag = tag as any;
  const svgHtml = icons[name] || '';
  return (
    <Tag
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
      {...rest}
    />
  );
}

export default Icon;
