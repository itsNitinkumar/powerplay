'use client';

import React from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

function HighlightItem({ h }: { h: { icon: string; t: string; d: string } }) {
  return (
    <div className="_odWCCi">
      <Icon name={h.icon} className="_rCLHzV" tag="div" />
      <div className="_AmWJrl">
        <div className="_JwWFHq">{h.t}</div>
        <div className="_joNbzi">{h.d}</div>
      </div>
    </div>
  );
}

export default function HighlightsSection() {
  return (
    <div
      className="_ZOaIER"
      style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '32px' }}
    >
      {listingData.highlights.map((h, i) => (
        <HighlightItem key={i} h={h} />
      ))}
    </div>
  );
}
