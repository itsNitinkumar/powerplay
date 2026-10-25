'use client';

import { useState } from 'react';
import { Share2, Heart } from 'lucide-react';
import { listing } from '@/data/listing';

interface TitleRowProps {
  saved: boolean;
  onToggleSave: () => void;
}

export default function TitleRow({ saved, onToggleSave }: TitleRowProps) {
  const [shareToast, setShareToast] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const shareData = {
      title: listing.title,
      text: `Check out this amazing property: ${listing.title}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2500);
      }
    } catch {
      // User cancelled or clipboard failed
    }
  }

  return (
    <div className="flex items-start justify-between gap-4 py-5">
      <h1 className="text-[26px] font-semibold text-[#222] leading-tight max-w-[680px]">
        {listing.title}
      </h1>

      <div className="flex items-center gap-1 flex-shrink-0 relative">
        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition-colors text-sm font-medium text-[#222] underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
          aria-label="Share this listing"
        >
          <Share2 size={16} aria-hidden="true" />
          Share
        </button>

        {/* Save */}
        <button
          onClick={onToggleSave}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition-colors text-sm font-medium text-[#222] underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={saved}
        >
          <Heart
            size={16}
            aria-hidden="true"
            className={`transition-colors duration-150 ${saved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222]'}`}
          />
          Save
        </button>

        {/* Share toast */}
        {shareToast && (
          <div
            role="status"
            aria-live="polite"
            className="absolute right-0 top-full mt-2 bg-[#222] text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg z-10"
          >
            Link copied to clipboard
          </div>
        )}
      </div>
    </div>
  );
}
