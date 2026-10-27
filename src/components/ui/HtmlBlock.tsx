import React from 'react';

interface HtmlBlockProps extends React.HTMLAttributes<HTMLElement> {
  html: string;
  className?: string;
  tag?: string;
  [key: string]: any;
}

export default function HtmlBlock({
  html,
  className,
  tag = 'div',
  ...rest
}: HtmlBlockProps) {
  const Tag = (tag || 'div') as any;
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}
