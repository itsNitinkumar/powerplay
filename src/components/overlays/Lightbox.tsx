'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Grid2X2 } from 'lucide-react';
import { listing } from '@/data/listing';

interface LightboxProps {
  isOpen: boolean;
  photoIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenGrid: () => void; // go back to photo tour
}

export default function Lightbox({
  isOpen,
  photoIndex,
  onClose,
  onPrev,
  onNext,
  onOpenGrid,
}: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const total = listing.gallery.length;
  const isFirst = photoIndex === 0;
  const isLast = photoIndex === total - 1;
  const photo = listing.gallery[photoIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (!isFirst) onPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!isLast) onNext();
          break;
        case 'Tab': {
          if (!containerRef.current) break;
          const focusable = containerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled])'
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
          break;
        }
      }
    },
    [isFirst, isLast, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.classList.add('overlay-open');
      document.addEventListener('keydown', handleKeyDown);
      // Focus close button on open
      setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('overlay-open');
      };
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overlay-open');
      previousFocusRef.current?.focus();
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !photo) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${photoIndex + 1} of ${total}: ${photo.alt}`}
      className="fixed inset-0 z-[9999] bg-white flex flex-col fade-in"
    >
      {/* Top bar */}
      <div className="flex items-center px-6 h-[72px] border-b border-[#DDDDDD] flex-shrink-0">
        {/* Grid/back to tour */}
        <button
          onClick={onOpenGrid}
          aria-label="Back to photo grid"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
        >
          <Grid2X2 size={18} aria-hidden="true" />
        </button>

        {/* Photo title - centered */}
        <div className="flex-1 text-center">
          <h2 className="text-sm font-semibold text-[#222] truncate px-4">
            {photo.category}
          </h2>
        </div>

        {/* Counter + close */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#717171]" aria-live="polite" aria-atomic="true">
            {photoIndex + 1} / {total}
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close lightbox"
            className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden px-20">
        {/* Previous button */}
        <button
          ref={prevBtnRef}
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous photo"
          aria-disabled={isFirst}
          className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white border border-[#DDDDDD] flex items-center justify-center shadow-md hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-[#FF385C]"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        {/* Image */}
        <div className="relative w-full h-full max-w-4xl mx-auto">
          <Image
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain transition-opacity duration-200"
            sizes="(max-width: 1280px) 80vw, 1024px"
            priority
          />
        </div>

        {/* Next button */}
        <button
          ref={nextBtnRef}
          onClick={onNext}
          disabled={isLast}
          aria-label="Next photo"
          aria-disabled={isLast}
          className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white border border-[#DDDDDD] flex items-center justify-center shadow-md hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-[#FF385C]"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Photo alt text caption */}
      <div className="flex-shrink-0 py-3 text-center">
        <p className="text-sm text-[#717171]">{photo.alt}</p>
      </div>
    </div>
  );
}
