'use client';

import React from 'react';
import {
  OverviewSummary,
  GuestFavouriteBadge,
  HostSummary,
} from './OverviewSection';
import HighlightsSection from './HighlightsSection';
import DescriptionSection from './DescriptionSection';
import SleepingSection from './SleepingSection';
import AmenitiesSection from './AmenitiesSection';
import CalendarSection from './CalendarSection';

export default function LeftColumn() {
  return (
    <div className="_joiPBF" id="contentLeft">
      <OverviewSummary />
      <GuestFavouriteBadge />
      <HostSummary />
      <HighlightsSection />
      <DescriptionSection />
      <SleepingSection />
      <AmenitiesSection />
      <CalendarSection />
    </div>
  );
}
