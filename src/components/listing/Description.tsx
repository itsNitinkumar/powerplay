'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { listing } from '@/data/listing';
import { Divider } from '@/components/ui/SectionHeading';

const SHORT_LIMIT = 280;

export default function Description() {
  const [expanded, setExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const text = listing.description;
  const isLong = text.length > SHORT_LIMIT;
  const displayText = expanded || !isLong ? text : text.slice(0, SHORT_LIMIT) + '…';

  return (
    <section aria-label="Property description" className="space-y-4">
      <div className="relative">
        <div
          className="text-[#222] text-base leading-relaxed whitespace-pre-line"
          lang={showOriginal ? 'en' : undefined}
        >
          {displayText}
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center gap-1 font-semibold text-[#222] underline text-sm hover:no-underline transition-all focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm"
          >
            {expanded ? (
              <>
                Show less <ChevronUp size={16} aria-hidden="true" />
              </>
            ) : (
              <>
                Show more <ChevronDown size={16} aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>

      <div>
        <button
          onClick={() => setShowOriginal(v => !v)}
          className="text-sm font-semibold text-[#222] underline hover:no-underline transition-all focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm"
          aria-pressed={showOriginal}
        >
          {showOriginal ? 'Show translation' : 'Show original'}
        </button>
      </div>

      <Divider className="mt-6" />
    </section>
  );
}
