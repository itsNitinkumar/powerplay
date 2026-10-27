'use client';

import React from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';
import HtmlBlock from '@/components/ui/HtmlBlock';

function MapWidget() {
  return (
    <div className="_PxCiiz">
      <div className="_pLIPHL" />
      <button
        className="_vPtpbJ"
        aria-label="Search"
        onClick={e => e.preventDefault()}
      >
        <Icon name="search" style={{ width: '16px', height: '16px' }} />
      </button>
      <div className="_eBzTKK">
        <button aria-label="Zoom in" onClick={e => e.preventDefault()}>
          <Icon name="plus" className="ico" />
        </button>
        <button aria-label="Zoom out" onClick={e => e.preventDefault()}>
          <Icon name="minus" className="ico" />
        </button>
      </div>
      <Icon name="home" className="_DhBoQs" tag="div" />
    </div>
  );
}

export default function LocationSection() {
  return (
    <section className="_WNEjqG" id="location">
      <h2 className="_XZmvOH">{listingData.location.heading}</h2>
      <div className="_RzoDdP">{listingData.location.place}</div>
      <MapWidget />
      <HtmlBlock className="_pYppLa" html={listingData.location.note} />
      <div className="_uNDbeR">Neighbourhood highlights</div>
      <HtmlBlock
        className="_wtMVZA"
        html={listingData.location.neighbourhood}
      />
      <button
        className="_yWwrkC"
        style={{ marginTop: '18px' }}
        onClick={e => e.preventDefault()}
      >
        Show more <Icon name="chevronright" className="_VUbbfz" />
      </button>
    </section>
  );
}
