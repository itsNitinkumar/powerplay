'use client';

import Image from 'next/image';
import { Star, ShieldCheck, DoorOpen, MapPin } from 'lucide-react';
import { listing } from '@/data/listing';
import { Divider } from '@/components/ui/SectionHeading';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          aria-hidden="true"
          className={i <= Math.round(rating) ? 'fill-[#222] text-[#222]' : 'text-[#DDDDDD]'}
        />
      ))}
    </div>
  );
}

const highlightIconMap: Record<string, React.ReactNode> = {
  star: <Star size={24} aria-hidden="true" />,
  door: <DoorOpen size={24} aria-hidden="true" />,
  location: <MapPin size={24} aria-hidden="true" />,
};

export default function PropertySummary() {
  return (
    <div className="space-y-6">
      {/* Property type + stats */}
      <div>
        <h2 className="text-xl font-semibold text-[#222]">
          {listing.type} hosted by {listing.host.name}
        </h2>
        <p className="text-[#717171] text-sm mt-1">
          {listing.guests} guests · {listing.bedrooms} bedroom · {listing.beds} bed ·{' '}
          {listing.baths} bath
        </p>
      </div>

      <Divider />

      {/* Guest favourite card */}
      <div className="flex items-center gap-4 p-5 rounded-2xl border border-[#DDDDDD]">
        <div className="flex items-center gap-3">
          <Image
            src="/images/ui/laurel-left.png"
            alt=""
            width={32}
            height={60}
            className="object-contain"
            aria-hidden="true"
          />
          <div className="text-center">
            <p className="text-xs font-medium text-[#222] leading-tight">Guest</p>
            <p className="text-xs font-medium text-[#222] leading-tight">favourite</p>
          </div>
          <Image
            src="/images/ui/laurel-right.png"
            alt=""
            width={32}
            height={60}
            className="object-contain"
            aria-hidden="true"
          />
        </div>

        <div className="w-px h-12 bg-[#DDDDDD]" aria-hidden="true" />

        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold text-[#222]">{listing.rating}</span>
          <StarRating rating={listing.rating} />
        </div>

        <div className="w-px h-12 bg-[#DDDDDD]" aria-hidden="true" />

        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold text-[#222] underline cursor-pointer">
            {listing.reviewCount}
          </span>
          <span className="text-xs text-[#717171]">Reviews</span>
        </div>
      </div>

      <Divider />

      {/* Highlights */}
      <div className="space-y-4">
        {listing.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="text-[#222] flex-shrink-0 mt-0.5">
              {highlightIconMap[h.icon] ?? <ShieldCheck size={24} aria-hidden="true" />}
            </div>
            <div>
              <p className="font-medium text-[#222] text-base">{h.title}</p>
              <p className="text-sm text-[#717171]">{h.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />
    </div>
  );
}
