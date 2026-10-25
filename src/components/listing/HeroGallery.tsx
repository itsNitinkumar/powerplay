'use client';

import Image from 'next/image';
import { Grid2X2 } from 'lucide-react';
import { listing } from '@/data/listing';
import { GalleryPhoto } from '@/types';

interface HeroGalleryProps {
  onOpenPhotoTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function HeroGallery({ onOpenPhotoTour, onOpenLightbox }: HeroGalleryProps) {
  // Build the 5 hero photos from heroImages ids
  const heroPhotos: GalleryPhoto[] = listing.heroImages.map(id => {
    const found = listing.gallery.find(p => p.id === id);
    return found!;
  }).filter(Boolean);

  return (
    <section id="photos" aria-label="Property photos" className="relative">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '240px 240px',
          height: 480,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {/* Main large photo — spans 2 rows */}
        <div className="relative w-full h-full" style={{ gridRow: '1 / 3' }}>
          <button
            className="w-full h-full relative block focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:outline-offset-[-2px]"
            onClick={() => onOpenLightbox(0)}
            aria-label={`Open photo: ${heroPhotos[0]?.alt}`}
          >
            {heroPhotos[0] && (
              <Image
                src={heroPhotos[0].src}
                alt={heroPhotos[0].alt}
                fill
                sizes="(max-width: 1280px) 50vw, 640px"
                className="object-cover hover:brightness-95 transition-[filter] duration-200"
                priority
              />
            )}
          </button>
        </div>

        {/* 4 smaller photos in 2x2 grid */}
        {heroPhotos.slice(1, 5).map((photo, i) => {
          const globalIdx = listing.gallery.findIndex(p => p.id === photo?.id);
          const isLastVisible = i === 3;

          return (
            <div key={photo?.id ?? i} className="relative w-full h-full overflow-hidden">
              <button
                className="w-full h-full relative block focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:outline-offset-[-2px]"
                onClick={() => onOpenLightbox(globalIdx)}
                aria-label={`Open photo: ${photo?.alt}`}
              >
                {photo && (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1280px) 25vw, 320px"
                    className="object-cover hover:brightness-95 transition-[filter] duration-200"
                  />
                )}
              </button>

              {/* Show all photos button over last image */}
              {isLastVisible && (
                <div className="absolute right-3 bottom-3 z-10">
                  <button
                    onClick={onOpenPhotoTour}
                    className="flex items-center gap-2 bg-white text-[#222] text-sm font-semibold px-4 py-2 rounded-lg border border-[#222] hover:bg-[#F7F7F7] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
                    aria-label="Show all photos"
                  >
                    <Grid2X2 size={16} aria-hidden="true" />
                    Show all photos
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
