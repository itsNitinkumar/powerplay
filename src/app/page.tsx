'use client';

import React from 'react';
import ListingProvider from '@/context/ListingContext';
import SiteHeader from '@/components/listing/SiteHeader';
import ScrolledSubNav from '@/components/listing/ScrolledSubNav';
import TitleSection from '@/components/listing/TitleSection';
import HeroGrid from '@/components/listing/HeroGrid';
import LeftColumn from '@/components/listing/LeftColumn';
import ReservationAside from '@/components/listing/ReservationAside';
import WideSections from '@/components/listing/WideSections';

export default function Page() {
  return (
    <ListingProvider>
      <a className="_DLLasj" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <ScrolledSubNav />
      <main id="main">
        <div className="_zcNtKV">
          <TitleSection />
          <HeroGrid />
          <div className="_lhKJir">
            <LeftColumn />
            <aside className="_iJTxKe">
              <ReservationAside />
            </aside>
          </div>
          <WideSections />
        </div>
      </main>
    </ListingProvider>
  );
}
