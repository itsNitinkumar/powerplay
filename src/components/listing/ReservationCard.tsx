'use client';

import { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Users, Minus, Plus } from 'lucide-react';
import { listing } from '@/data/listing';
import Image from 'next/image';

export default function ReservationCard() {
  const [reservationFeedback, setReservationFeedback] = useState<string>('');
  const nights = 5;

  function handleReserve() {
    setReservationFeedback('Reservation request sent! You\'ll receive a confirmation within 24 hours.');
    setTimeout(() => setReservationFeedback(''), 4000);
  }

  const serviceFee = Math.round(listing.pricePerNight * nights * 0.13);
  const total = listing.pricePerNight * nights + serviceFee;

  return (
    <aside
      aria-label="Reservation details"
      className="border border-[#DDDDDD] rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.10)] space-y-4 bg-white"
    >
      {/* Price */}
      <div className="flex items-end gap-2">
        <div className="flex items-baseline gap-1">
          {listing.originalPrice && (
            <span className="text-sm text-[#717171] line-through">
              ₹{listing.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-2xl font-semibold text-[#222]">
            ₹{listing.pricePerNight.toLocaleString('en-IN')}
          </span>
          <span className="text-[#717171] text-sm"> night</span>
        </div>

        <div className="ml-auto flex items-center gap-1 text-sm">
          <Star size={14} className="fill-[#222] text-[#222]" aria-hidden="true" />
          <span className="font-medium">{listing.rating}</span>
          <span className="text-[#717171]">·</span>
          <span className="text-[#717171] underline cursor-pointer">{listing.reviewCount} reviews</span>
        </div>
      </div>

      {/* Date/guest inputs */}
      <div className="border border-[#DDDDDD] rounded-xl overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="p-3 border-r border-[#DDDDDD] border-b">
            <p className="text-[10px] font-semibold text-[#222] uppercase tracking-wide">Check-in</p>
            <p className="text-sm text-[#222]">10/10/2026</p>
          </div>
          <div className="p-3 border-b border-[#DDDDDD]">
            <p className="text-[10px] font-semibold text-[#222] uppercase tracking-wide">Checkout</p>
            <p className="text-sm text-[#222]">10/15/2026</p>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-[#222] uppercase tracking-wide">Guests</p>
            <p className="text-sm text-[#222]">2 guests</p>
          </div>
          <ChevronDown size={16} className="text-[#222]" aria-hidden="true" />
        </div>
      </div>

      {/* Reserve button */}
      <button
        onClick={handleReserve}
        className="w-full py-3.5 bg-gradient-to-r from-[#E61E4D] to-[#FF385C] text-white font-semibold rounded-xl hover:from-[#D70466] hover:to-[#E31C5F] transition-all duration-200 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C] shadow-md"
      >
        Reserve
      </button>

      {/* Feedback */}
      {reservationFeedback && (
        <p role="status" aria-live="polite" className="text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 text-center">
          {reservationFeedback}
        </p>
      )}

      <p className="text-center text-[#717171] text-sm">You won&apos;t be charged yet</p>

      {/* Price breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-[#222]">
          <span className="underline cursor-pointer">₹{listing.pricePerNight.toLocaleString('en-IN')} × {nights} nights</span>
          <span>₹{(listing.pricePerNight * nights).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm text-[#222]">
          <span className="underline cursor-pointer">Airbnb service fee</span>
          <span>₹{serviceFee.toLocaleString('en-IN')}</span>
        </div>
        <hr className="border-[#DDDDDD]" />
        <div className="flex justify-between font-semibold text-[#222]">
          <span>Total before taxes</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Discount banner */}
      <div className="flex items-center gap-2 p-3 bg-[#F7F7F7] rounded-xl text-sm">
        <Image src="/images/ui/discount.svg" alt="" width={20} height={20} aria-hidden="true" />
        <p className="text-[#222]">
          <span className="font-semibold">Lower price.</span> Your dates are ₹5,292 less than the avg. nightly rate of the last 60 days.
        </p>
      </div>
    </aside>
  );
}
