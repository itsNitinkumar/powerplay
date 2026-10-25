'use client';

import { Clock, Users, CigaretteOff, PawPrint, PartyPopper, Moon, Camera, AlertTriangle, Shield } from 'lucide-react';
import { listing } from '@/data/listing';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';
import { useState } from 'react';

const ruleIcons: Record<string, React.ReactNode> = {
  clock: <Clock size={20} aria-hidden="true" />,
  users: <Users size={20} aria-hidden="true" />,
  'cigarette-off': <CigaretteOff size={20} aria-hidden="true" />,
  'paw-print': <PawPrint size={20} aria-hidden="true" />,
  'party-popper': <PartyPopper size={20} aria-hidden="true" />,
  moon: <Moon size={20} aria-hidden="true" />,
  camera: <Camera size={20} aria-hidden="true" />,
};

export default function PoliciesSection() {
  const [cancellationExpanded, setCancellationExpanded] = useState(false);
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [safetyExpanded, setSafetyExpanded] = useState(false);

  return (
    <section aria-labelledby="policies-heading" className="space-y-6">
      <SectionHeading id="policies-heading">Things to know</SectionHeading>

      <div className="grid grid-cols-3 gap-8">
        {/* House rules */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#222]">House rules</h3>
          <div className="space-y-3">
            {listing.houseRules.slice(0, rulesExpanded ? undefined : 4).map((rule, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#222]">
                <div className="flex-shrink-0 mt-0.5 text-[#717171]">
                  {ruleIcons[rule.icon] ?? <AlertTriangle size={20} />}
                </div>
                <span>{rule.text}</span>
              </div>
            ))}
          </div>
          {listing.houseRules.length > 4 && (
            <button
              onClick={() => setRulesExpanded(v => !v)}
              aria-expanded={rulesExpanded}
              className="text-sm font-semibold text-[#222] underline hover:no-underline focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm"
            >
              {rulesExpanded ? 'Show less' : `Show all ${listing.houseRules.length} rules`}
            </button>
          )}
        </div>

        {/* Safety */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#222]">Safety & property</h3>
          <div className="space-y-3">
            {listing.safetyItems.slice(0, safetyExpanded ? undefined : 4).map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#222]">
                <Shield size={20} className="flex-shrink-0 mt-0.5 text-[#717171]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          {listing.safetyItems.length > 4 && (
            <button
              onClick={() => setSafetyExpanded(v => !v)}
              aria-expanded={safetyExpanded}
              className="text-sm font-semibold text-[#222] underline hover:no-underline focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm"
            >
              {safetyExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Cancellation */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#222]">Cancellation policy</h3>
          <p className="text-sm text-[#222] leading-relaxed whitespace-pre-line">
            {cancellationExpanded
              ? listing.cancellationPolicy
              : listing.cancellationPolicy.split('\n\n')[0]}
          </p>
          <button
            onClick={() => setCancellationExpanded(v => !v)}
            aria-expanded={cancellationExpanded}
            className="text-sm font-semibold text-[#222] underline hover:no-underline focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm"
          >
            {cancellationExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      </div>

      <Divider />
    </section>
  );
}
