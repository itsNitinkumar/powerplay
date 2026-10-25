'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronDown } from 'lucide-react';
import { listing } from '@/data/listing';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';
import { Review } from '@/types';

const SHOW_LIMIT = 3;
const TEXT_LIMIT = 220;

const chipImages: Record<string, string> = {
  Cleanliness: '/images/chips/cleanliness.png',
  Accuracy: '/images/chips/accuracy.png',
  'Check-in': '/images/chips/condition.png',
  Communication: '/images/chips/hospitality.png',
  Location: '/images/chips/location.png',
  Value: '/images/chips/amenities.png',
};

function RatingBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-[#DDDDDD] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#222] rounded-full transition-all duration-500"
          style={{ width: `${(score / 5) * 100}%` }}
          role="presentation"
        />
      </div>
      <span className="text-xs w-6 text-right text-[#222] font-medium">{score}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > TEXT_LIMIT;
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, TEXT_LIMIT) + '…';

  return (
    <article className="space-y-3">
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image src={review.authorAvatar} alt={review.authorName} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-[#222] text-sm">{review.authorName}</p>
          <p className="text-xs text-[#717171]">{review.location}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 text-xs text-[#717171]">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              size={10}
              aria-hidden="true"
              className={i <= review.rating ? 'fill-[#222] text-[#222]' : 'text-[#DDDDDD]'}
            />
          ))}
        </div>
        <span>·</span>
        <span>{review.date}</span>
        {review.years && (
          <>
            <span>·</span>
            <span>{review.years} year{review.years !== 1 ? 's' : ''} on Airbnb</span>
          </>
        )}
      </div>

      {/* Text */}
      <p className="text-[#222] text-sm leading-relaxed">{displayText}</p>

      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          className="text-sm font-semibold text-[#222] underline hover:no-underline focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </article>
  );
}

interface ReviewsProps {
  onShowAll?: () => void;
}

export default function Reviews({ onShowAll }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayReviews = showAll ? listing.reviews : listing.reviews.slice(0, SHOW_LIMIT);

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="space-y-6">
      {/* Heading with overall rating */}
      <div className="flex items-center gap-2">
        <Star size={20} className="fill-[#222] text-[#222]" aria-hidden="true" />
        <SectionHeading id="reviews-heading">
          {listing.rating} · {listing.reviewCount} reviews
        </SectionHeading>
      </div>

      {/* Guest favourite chip */}
      <div className="flex items-center gap-3 p-4 border border-[#DDDDDD] rounded-2xl">
        <Image src="/images/ui/laurel-left.png" alt="" width={24} height={44} className="object-contain" aria-hidden="true" />
        <div className="text-center">
          <p className="text-xs font-medium text-[#222]">Guest</p>
          <p className="text-xs font-medium text-[#222]">favourite</p>
        </div>
        <Image src="/images/ui/laurel-right.png" alt="" width={24} height={44} className="object-contain" aria-hidden="true" />

        <div className="ml-4 flex-1 text-sm text-[#717171]">
          One of the most loved homes on Airbnb based on ratings, reviews, and reliability
        </div>
      </div>

      {/* Rating breakdown */}
      <div className="grid grid-cols-2 gap-3">
        {listing.ratingBreakdown.map(rb => (
          <div key={rb.category} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {chipImages[rb.category] && (
                  <Image
                    src={chipImages[rb.category]}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                    aria-hidden="true"
                  />
                )}
                <span className="text-sm text-[#222]">{rb.category}</span>
              </div>
              <RatingBar score={rb.score} />
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Review list */}
      <div className="grid grid-cols-2 gap-8">
        {displayReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show all reviews */}
      {!showAll && listing.reviews.length > SHOW_LIMIT && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 px-6 py-3 border border-[#222] rounded-lg text-sm font-semibold text-[#222] hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
        >
          Show all {listing.reviewCount} reviews
        </button>
      )}

      <Divider />
    </section>
  );
}
