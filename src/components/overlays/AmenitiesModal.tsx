'use client';

import React from 'react';
import { useListingContext } from '@/context/ListingContext';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

function AmenityItem({ it }: { it: any }) {
  return (
    <div className={`_gmngIQ${it.un ? ' _LJqhqA' : ''}`}>
      <Icon name={it.icon} className="ico" />
      <span className="label">{it.t}</span>
    </div>
  );
}

function AmenityGroup({ g }: { g: any }) {
  return (
    <div className="_kxKLYi">
      <h3>{g.group}</h3>
      {g.items.map((it: any, idx: number) => (
        <AmenityItem key={idx} it={it} />
      ))}
    </div>
  );
}

export default function AmenitiesModal() {
  const { amenOpen, closeAmen } = useListingContext();

  return (
    <div
      className={`_yBjuYG${amenOpen ? ' _PjnNJs' : ''}`}
      id="amenModal"
      aria-hidden={amenOpen ? 'false' : 'true'}
      onClick={e => {
        if (e.target === e.currentTarget) closeAmen();
      }}
    >
      <div
        className="_mdAcnz"
        role="dialog"
        aria-modal="true"
        aria-label="What this place offers"
      >
        <div className="_zwFSmY">
          <button
            className="_bNHEUf _cqnRCd"
            type="button"
            aria-label="Close"
            id="amenClose"
            onClick={closeAmen}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="_LsDhqL" id="amenBody">
          <h2>What this place offers</h2>
          {listingData.amenitiesFull.map((g: any, idx: number) => (
            <AmenityGroup key={idx} g={g} />
          ))}
        </div>
      </div>
    </div>
  );
}
