'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { listing } from '@/data/listing';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';
import { NearbyStay } from '@/types';

function NearbyCard({ stay }: { stay: NearbyStay }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="nearby-card min-w-0">
      <div className="relative rounded-xl overflow-hidden aspect-square mb-3">
        <Image src={stay.image} alt={stay.title} fill className="object-cover" sizes="280px" />
        <button
          onClick={() => setSaved(v => !v)}
          aria-label={saved ? `Remove ${stay.title} from wishlist` : `Save ${stay.title} to wishlist`}
          aria-pressed={saved}
          className="absolute top-3 right-3 p-1 focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-full"
        >
          <Heart
            size={20}
            className={`drop-shadow-md transition-colors ${saved ? 'fill-[#FF385C] text-[#FF385C]' : 'fill-white/50 text-white'}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="space-y-0.5">
        <div className="flex items-center justify-between">
          <p className="font-medium text-[#222] text-sm truncate">{stay.location}</p>
          <div className="flex items-center gap-0.5 text-xs">
            <Star size={12} className="fill-[#222] text-[#222]" aria-hidden="true" />
            <span className="font-medium">{stay.rating}</span>
          </div>
        </div>
        <p className="text-[#717171] text-sm">{stay.title}</p>
        {stay.dates && <p className="text-[#717171] text-sm">{stay.dates}</p>}
        <p className="text-sm">
          <span className="font-semibold text-[#222]">₹{stay.pricePerNight.toLocaleString('en-IN')}</span>
          <span className="text-[#717171]"> night</span>
        </p>
        {stay.nights && (
          <p className="text-[#717171] text-sm underline">
            ₹{(stay.pricePerNight * stay.nights).toLocaleString('en-IN')} total
          </p>
        )}
      </div>
    </div>
  );
}

export default function NearbyStays() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right') {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  }

  return (
    <section aria-labelledby="nearby-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeading id="nearby-heading">More places to stay</SectionHeading>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full border border-[#DDDDDD] flex items-center justify-center hover:border-[#222] hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[#FF385C]"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full border border-[#DDDDDD] flex items-center justify-center hover:border-[#222] hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[#FF385C]"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="grid gap-4 overflow-x-auto no-scrollbar"
        style={{
          gridAutoFlow: 'column',
          gridAutoColumns: 'calc(25% - 12px)',
          scrollSnapType: 'x mandatory',
        }}
        role="list"
        aria-label="Nearby stays carousel"
      >
        {listing.nearbyStays.map(stay => (
          <div key={stay.id} role="listitem" style={{ scrollSnapAlign: 'start' }}>
            <NearbyCard stay={stay} />
          </div>
        ))}
      </div>

      <Divider className="mt-6" />
    </section>
  );
}
