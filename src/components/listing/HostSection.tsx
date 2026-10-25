'use client';

import Image from 'next/image';
import { Star, ShieldCheck, MessageCircle } from 'lucide-react';
import { listing } from '@/data/listing';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';

export default function HostSection() {
  const { host, coHosts } = listing;
  const yearsHosting = new Date().getFullYear() - host.joinedYear;

  function handleMessage() {
    // Demo action - show alert
    const banner = document.getElementById('message-feedback');
    if (banner) {
      banner.textContent = `Message sent to ${host.name}! They'll respond within ${host.responseTime}.`;
      banner.hidden = false;
      setTimeout(() => { if (banner) banner.hidden = true; }, 3500);
    }
  }

  return (
    <section aria-labelledby="host-heading" className="space-y-6">
      {/* Host profile */}
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image src={host.avatar} alt={host.name} fill className="object-cover" />
        </div>
        <div>
          <SectionHeading id="host-heading" level={2}>
            Hosted by {host.name}
          </SectionHeading>
          <p className="text-[#717171] text-sm mt-0.5">
            {yearsHosting} year{yearsHosting !== 1 ? 's' : ''} hosting
          </p>
        </div>
      </div>

      {/* Host stats */}
      <div className="flex items-center gap-6 text-sm text-[#222]">
        <div className="flex items-center gap-1.5">
          <Star size={14} className="fill-[#222]" aria-hidden="true" />
          <span>{host.rating} · {host.reviewCount} Reviews</span>
        </div>
        {host.isSuperhost && (
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Superhost</span>
          </div>
        )}
      </div>

      {/* About */}
      <p className="text-[#222] text-base leading-relaxed">{host.about}</p>

      {/* Response stats */}
      <div className="space-y-2 text-sm text-[#222]">
        <p><span className="font-semibold">Response rate: </span>{host.responseRate}%</p>
        <p><span className="font-semibold">Responds: </span>{host.responseTime}</p>
      </div>

      {/* Message host */}
      <div>
        <div
          id="message-feedback"
          role="status"
          aria-live="polite"
          hidden
          className="mb-3 p-3 bg-green-50 text-green-800 rounded-lg text-sm border border-green-200"
        />
        <button
          onClick={handleMessage}
          className="px-6 py-3 bg-[#222] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
        >
          Message Host
        </button>
      </div>

      {/* Co-hosts */}
      {coHosts.length > 0 && (
        <div>
          <p className="font-semibold text-[#222] mb-3">Co-hosts</p>
          <div className="flex items-center gap-3">
            {coHosts.map(coHost => (
              <div key={coHost.name} className="flex flex-col items-center gap-1">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={coHost.avatar} alt={coHost.name} fill className="object-cover" />
                </div>
                <span className="text-xs text-[#717171]">{coHost.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-4 bg-[#F7F7F7] rounded-xl text-xs text-[#717171]">
        <ShieldCheck size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</p>
      </div>

      <Divider />
    </section>
  );
}
