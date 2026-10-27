'use client';

import React, { useState } from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

export default function DescriptionSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="_YidPyi" style={{ borderTop: '1px solid var(--line-soft)' }}>
      <div className="_yWMtoE">
        <span>
          Some info has been automatically translated.{' '}
          <a href="#" onClick={e => e.preventDefault()}>
            Show original
          </a>
        </span>
      </div>
      <p id="descText" className={expanded ? '' : '_kfKUOt'}>
        {listingData.descIntro}
      </p>
      <button
        className="_yWwrkC"
        id="descMore"
        onClick={() => setExpanded(prev => !prev)}
      >
        {expanded ? 'Show less' : 'Show more'}{' '}
        <Icon name="chevronright" className="_VUbbfz" />
      </button>
    </div>
  );
}
