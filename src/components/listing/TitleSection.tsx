'use client';

import React, { useState } from 'react';
import { useListingContext } from '@/context/ListingContext';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

export default function TitleSection() {
  const { toast } = useListingContext();
  const [saved, setSaved] = useState(false);

  const toggleSave = () => {
    const nextSaved = !saved;
    setSaved(nextSaved);
    toast(nextSaved ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  return (
    <section className="_DbxOEt" id="photos">
      <h1 className="_WQsVLm">{listingData.title}</h1>
      <div className="_aZSeca">
        <button
          className="_EmrQRK"
          type="button"
          id="shareBtn"
          onClick={() => toast('Share options')}
        >
          <Icon name="share" className="_oQmVpq" />
          <span className="_uOQIyx">Share</span>
        </button>
        <button
          className={`_EmrQRK${saved ? ' _nfavct' : ''}`}
          type="button"
          id="saveBtn"
          onClick={toggleSave}
        >
          <Icon name={saved ? 'heartFill' : 'heart'} className="_oQmVpq" />
          <span className="_uOQIyx">{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </section>
  );
}
