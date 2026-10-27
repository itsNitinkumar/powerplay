'use client';

import React from 'react';
import { useListingContext } from '@/context/ListingContext';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

export default function HeroGrid() {
  const { flat, openTour } = useListingContext();

  const getRoomIndex = (name: string) => {
    const item = flat.find(f => f.name === name);
    return item ? item.roomIndex : 0;
  };

  return (
    <section className="_Zndiww" id="_Zndiww" aria-label="Photos of this place">
      <div className="_DPzomV" id="heroGrid">
        {listingData.hero.map((imgName, idx) => (
          <button
            key={idx}
            className="_toiEJx"
            type="button"
            aria-label={`${listingData.title} image ${idx + 1}`}
            onClick={e => openTour(getRoomIndex(imgName), e.currentTarget)}
          >
            <img
              src={`/assets/images/${imgName}.jpeg`}
              alt=""
              decoding="async"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>
      <button
        className="_ujAXFb"
        type="button"
        id="showAllPhotos"
        onClick={e => openTour(null, e.currentTarget)}
      >
        <Icon name="gridicon" className="_Ljuvbv" /> Show all photos
      </button>
    </section>
  );
}
