'use client';

import React from 'react';
import { useListingContext } from '@/context/ListingContext';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

function AmenityPreview({ a }: { a: { icon: string; t: string; un?: boolean } }) {
  return (
    <div className={`_XByKcL${a.un ? ' _LJqhqA' : ''}`}>
      <Icon name={a.icon} className="ico" />
      <span className="label">{a.t}</span>
    </div>
  );
}

export default function AmenitiesSection() {
  const { openAmen } = useListingContext();

  return (
    <div className="_QZaLue" id="amenities">
      <h2 className="_XZmvOH">What this place offers</h2>
      <div className="_TCsYZP">
        {listingData.amenitiesPreview.map((a, idx) => (
          <AmenityPreview key={idx} a={a} />
        ))}
      </div>
      <button
        className="_XZuuKk"
        id="showAmen"
        onClick={e => openAmen(e.currentTarget)}
      >
        Show all 50 amenities
      </button>
    </div>
  );
}
