'use client';

import { MapPin, ExternalLink } from 'lucide-react';
import { listing } from '@/data/listing';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';

export default function LocationSection() {
  return (
    <section id="location" aria-labelledby="location-heading" className="space-y-4">
      <SectionHeading id="location-heading">Where you&apos;ll be</SectionHeading>

      <p className="text-[#222] font-medium flex items-center gap-1.5">
        <MapPin size={16} className="text-[#222]" aria-hidden="true" />
        {listing.locationDetail}
      </p>

      {/* Map placeholder */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-[#F0F0F0] border border-[#DDDDDD]"
        style={{ height: 400 }}
        aria-label="Map showing property location"
        role="img"
      >
        {/* Static map-like background */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#717171] gap-3">
          <MapPin size={40} className="text-[#FF385C]" aria-hidden="true" />
          <div className="bg-white rounded-xl px-4 py-2 shadow-md text-sm font-medium text-[#222]">
            {listing.location}
          </div>
          <p className="text-xs text-[#717171]">
            Exact location provided after booking
          </p>
        </div>

        {/* Grid lines for map aesthetic */}
        <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#717171" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <p className="text-[#222] text-base leading-relaxed">{listing.locationDescription}</p>

      <Divider className="mt-6" />
    </section>
  );
}
