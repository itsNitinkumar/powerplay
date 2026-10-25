'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/listing/Header';
import TitleRow from '@/components/listing/TitleRow';
import HeroGallery from '@/components/listing/HeroGallery';
import PropertySummary from '@/components/listing/PropertySummary';
import Description from '@/components/listing/Description';
import SleepSection from '@/components/listing/SleepSection';
import Amenities from '@/components/listing/Amenities';
import DateCalendar from '@/components/listing/DateCalendar';
import Reviews from '@/components/listing/Reviews';
import LocationSection from '@/components/listing/LocationSection';
import HostSection from '@/components/listing/HostSection';
import PoliciesSection from '@/components/listing/PoliciesSection';
import NearbyStays from '@/components/listing/NearbyStays';
import ReservationCard from '@/components/listing/ReservationCard';
import PhotoTour from '@/components/overlays/PhotoTour';
import Lightbox from '@/components/overlays/Lightbox';
import { OverlayState } from '@/types';
import { listing } from '@/data/listing';

export default function ListingPage() {
  const [overlay, setOverlay] = useState<OverlayState>({ type: 'none' });
  const [saved, setSaved] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openPhotoTour(startCategory?: string) {
    setOverlay({ type: 'photo-tour', startCategory });
  }

  function openLightbox(photoIndex: number) {
    setOverlay({ type: 'lightbox', photoIndex, fromTour: overlay.type === 'photo-tour' });
  }

  function closeLightbox() {
    if ((overlay as { fromTour?: boolean }).fromTour) {
      setOverlay({ type: 'photo-tour' });
    } else {
      setOverlay({ type: 'none' });
    }
  }

  function closePhotoTour() {
    setOverlay({ type: 'none' });
  }

  const totalPhotos = listing.gallery.length;

  function prevPhoto() {
    if (overlay.type !== 'lightbox') return;
    if (overlay.photoIndex > 0) {
      setOverlay({ ...overlay, photoIndex: overlay.photoIndex - 1 });
    }
  }

  function nextPhoto() {
    if (overlay.type !== 'lightbox') return;
    if (overlay.photoIndex < totalPhotos - 1) {
      setOverlay({ ...overlay, photoIndex: overlay.photoIndex + 1 });
    }
  }

  return (
    <>
      <Header scrolled={headerScrolled} />

      {/* Main page — padded for fixed header */}
      <main id="main-content" className="pt-[80px]">
        {/* Constrained content */}
        <div className="max-w-[1120px] mx-auto px-6 lg:px-10">
          {/* Title row */}
          <TitleRow saved={saved} onToggleSave={() => setSaved(v => !v)} />

          {/* Hero gallery */}
          <HeroGallery
            onOpenPhotoTour={() => openPhotoTour()}
            onOpenLightbox={openLightbox}
          />

          {/* Two-column layout */}
          <div className="mt-8 flex gap-16 items-start">
            {/* Left column */}
            <div className="flex-1 min-w-0 space-y-8">
              <PropertySummary />
              <Description />
              <SleepSection />
              <Amenities />
              <DateCalendar />
              <Reviews />
              <LocationSection />
              <HostSection />
              <PoliciesSection />
              <NearbyStays />
            </div>

            {/* Right column — reservation card */}
            <aside className="hidden lg:block w-[380px] flex-shrink-0">
              <div className="reservation-sticky">
                <ReservationCard />
              </div>
            </aside>
          </div>
        </div>

        {/* Footer area */}
        <footer className="border-t border-[#DDDDDD] mt-16 py-8 bg-[#F7F7F7]">
          <div className="max-w-[1120px] mx-auto px-6 lg:px-10">
            <p className="text-sm text-[#717171]">
              © {new Date().getFullYear()} Airbnb Clone · Playpower Labs Take-Home Assignment
            </p>
          </div>
        </footer>
      </main>

      {/* Overlays */}
      <PhotoTour
        isOpen={overlay.type === 'photo-tour'}
        onClose={closePhotoTour}
        onOpenLightbox={openLightbox}
        startCategory={(overlay as { startCategory?: string }).startCategory}
      />

      <Lightbox
        isOpen={overlay.type === 'lightbox'}
        photoIndex={(overlay as { photoIndex?: number }).photoIndex ?? 0}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
        onOpenGrid={() => {
          const idx = (overlay as { photoIndex?: number }).photoIndex ?? 0;
          const photo = listing.gallery[idx];
          setOverlay({ type: 'photo-tour', startCategory: photo?.category });
        }}
      />
    </>
  );
}
