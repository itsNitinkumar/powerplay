'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, Share2, Heart, ChevronLeft } from 'lucide-react';
import { listing } from '@/data/listing';
import { GalleryPhoto } from '@/types';

interface PhotoTourProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLightbox: (index: number) => void;
  startCategory?: string;
}

// Group photos by category
function groupByCategory(photos: GalleryPhoto[]) {
  const map = new Map<string, { order: number; photos: GalleryPhoto[] }>();
  for (const p of photos) {
    if (!map.has(p.category)) {
      map.set(p.category, { order: p.categoryOrder, photos: [] });
    }
    map.get(p.category)!.photos.push(p);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[1].order - b[1].order)
    .map(([category, { photos }]) => ({ category, photos }));
}

export default function PhotoTour({
  isOpen,
  onClose,
  onOpenLightbox,
  startCategory,
}: PhotoTourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const grouped = groupByCategory(listing.gallery);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href]'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.classList.add('overlay-open');
      document.addEventListener('keydown', handleKeyDown);

      // Scroll to category if provided
      if (startCategory) {
        setTimeout(() => {
          const el = document.getElementById(`category-${encodeURIComponent(startCategory)}`);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }

      // Focus close button
      setTimeout(() => firstFocusableRef.current?.focus(), 50);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('overlay-open');
      };
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overlay-open');
      previousFocusRef.current?.focus();
    }
  }, [isOpen, handleKeyDown, startCategory]);

  if (!isOpen) return null;

  const categories = grouped.map(g => g.category);

  function scrollToCategory(cat: string) {
    const el = document.getElementById(`category-${encodeURIComponent(cat)}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      className="fixed inset-0 z-[9000] bg-white overflow-y-auto fade-in"
    >
      {/* Top bar */}
      <div className="sticky top-0 bg-white z-10 border-b border-[#DDDDDD]">
        <div className="max-w-[1120px] mx-auto px-6 h-[72px] flex items-center justify-between gap-4">
          {/* Back */}
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label="Close photo tour and go back"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
          >
            <ChevronLeft size={20} aria-hidden="true" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>

          {/* Title */}
          <h2 className="text-base font-semibold text-[#222] absolute left-1/2 -translate-x-1/2">
            Photo tour
          </h2>

          {/* Share + favorite */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Share"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] text-sm font-medium underline transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
            >
              <Share2 size={15} aria-hidden="true" />
              Share
            </button>
            <button
              aria-label="Save to wishlist"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] text-sm font-medium underline transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
            >
              <Heart size={15} aria-hidden="true" />
              Save
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="max-w-[1120px] mx-auto px-6 flex items-center gap-2 pb-3 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full border border-[#DDDDDD] text-sm text-[#222] hover:border-[#222] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#FF385C]"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery sections */}
      <div className="max-w-[1120px] mx-auto px-6 py-8 space-y-12">
        {grouped.map(({ category, photos }) => (
          <section
            key={category}
            id={`category-${encodeURIComponent(category)}`}
            aria-labelledby={`cat-heading-${encodeURIComponent(category)}`}
          >
            <div className="mb-4">
              <h3
                id={`cat-heading-${encodeURIComponent(category)}`}
                className="text-xl font-semibold text-[#222]"
              >
                {category}
              </h3>
              <p className="text-sm text-[#717171] mt-0.5">
                {photos.length} photo{photos.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {photos.map(photo => {
                const globalIdx = listing.gallery.findIndex(p => p.id === photo.id);
                return (
                  <button
                    key={photo.id}
                    onClick={() => onOpenLightbox(globalIdx)}
                    aria-label={`Open photo: ${photo.alt}`}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:outline-offset-2"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1120px) 50vw, 560px"
                      className="object-cover group-hover:brightness-95 transition-[filter] duration-200"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
