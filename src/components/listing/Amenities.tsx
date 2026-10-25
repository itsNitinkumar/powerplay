'use client';

import { useState } from 'react';
import {
  Wifi, Wind, Tv, Coffee, UtensilsCrossed, Car, Waves,
  Dumbbell, Flame, Droplets, Bed, Archive, ShirtIcon, Monitor,
  Sun, AlertTriangle, Heart, AlertCircle, BedDouble, Fan,
  CheckCircle, XCircle,
} from 'lucide-react';
import { listing } from '@/data/listing';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';
import { Amenity } from '@/types';

const SHOW_COUNT = 10;

const iconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi size={24} />,
  wind: <Wind size={24} />,
  tv: <Tv size={24} />,
  coffee: <Coffee size={24} />,
  utensils: <UtensilsCrossed size={24} />,
  car: <Car size={24} />,
  waves: <Waves size={24} />,
  dumbbell: <Dumbbell size={24} />,
  flame: <Flame size={24} />,
  droplets: <Droplets size={24} />,
  droplet: <Droplets size={24} />,
  bed: <BedDouble size={24} />,
  archive: <Archive size={24} />,
  shirt: <ShirtIcon size={24} />,
  monitor: <Monitor size={24} />,
  sun: <Sun size={24} />,
  'alert-triangle': <AlertTriangle size={24} />,
  heart: <Heart size={24} />,
  'alert-circle': <AlertCircle size={24} />,
  fan: <Fan size={24} />,
  'check-circle': <CheckCircle size={24} />,
  'x-circle': <XCircle size={24} />,
  'hot-tub': (
    <svg viewBox="0 0 32 32" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
      <ellipse cx="16" cy="20" rx="12" ry="7" />
      <path d="M7 20 Q8 14 16 14 Q24 14 25 20" />
      <path d="M10 10 Q12 7 10 4" strokeLinecap="round" />
      <path d="M16 10 Q18 7 16 4" strokeLinecap="round" />
      <path d="M22 10 Q24 7 22 4" strokeLinecap="round" />
    </svg>
  ),
};

function getIcon(name: string): React.ReactNode {
  return iconMap[name] ?? <CheckCircle size={24} />;
}

function AmenityItem({ amenity }: { amenity: Amenity }) {
  return (
    <div
      className={`flex items-center gap-4 py-2 ${amenity.available ? '' : 'opacity-40'}`}
    >
      <div className="text-[#222] flex-shrink-0">
        {getIcon(amenity.icon)}
      </div>
      <span className={`text-[#222] text-base ${!amenity.available ? 'line-through' : ''}`}>
        {amenity.name}
        {!amenity.available && (
          <span className="sr-only"> (not available)</span>
        )}
      </span>
    </div>
  );
}

interface AmenitiesProps {
  onShowAll?: () => void;
}

export default function Amenities({ onShowAll }: AmenitiesProps) {
  const [showModal, setShowModal] = useState(false);

  const available = listing.amenities.filter(a => a.available);
  const unavailable = listing.amenities.filter(a => !a.available);
  const displayList = listing.amenities.slice(0, SHOW_COUNT);

  return (
    <section id="amenities" aria-labelledby="amenities-heading">
      <SectionHeading id="amenities-heading" className="mb-4">
        What this place offers
      </SectionHeading>

      <div className="grid grid-cols-2 gap-1">
        {displayList.map(a => (
          <AmenityItem key={a.id} amenity={a} />
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 px-6 py-3 border border-[#222] rounded-lg text-sm font-semibold text-[#222] hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
        aria-haspopup="dialog"
      >
        Show all {listing.amenities.length} amenities
      </button>

      {/* Amenities Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="All amenities"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 fade-in"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-[#DDDDDD] px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">What this place offers</h2>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close amenities"
                className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4 space-y-6">
              {/* Group by category */}
              {Array.from(new Set(listing.amenities.map(a => a.category))).map(cat => {
                const items = listing.amenities.filter(a => a.category === cat);
                return (
                  <div key={cat}>
                    <h3 className="font-semibold text-[#222] mb-3">{cat}</h3>
                    {items.map(a => <AmenityItem key={a.id} amenity={a} />)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Divider className="mt-10" />
    </section>
  );
}
