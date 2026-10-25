'use client';

import Image from 'next/image';
import { BedDouble } from 'lucide-react';
import { listing } from '@/data/listing';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';

export default function SleepSection() {
  return (
    <section aria-labelledby="sleep-heading" className="space-y-4">
      <SectionHeading id="sleep-heading">Where you&apos;ll sleep</SectionHeading>

      <div className="border border-[#DDDDDD] rounded-xl p-6 max-w-[260px]">
        <BedDouble size={32} className="text-[#222] mb-3" aria-hidden="true" />
        <p className="font-semibold text-[#222] text-base">Bedroom</p>
        <p className="text-[#717171] text-sm mt-0.5">{listing.sleepDescription}</p>
      </div>

      <Divider className="mt-6" />
    </section>
  );
}
