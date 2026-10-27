'use client';

import React from 'react';
import { useListingContext } from '@/context/ListingContext';

export default function Toast() {
  const { toastMsg, toastShow } = useListingContext();
  return (
    <div
      className={`_HALoyX${toastShow ? ' _fTQmRt' : ''}`}
      id="_HALoyX"
      role="status"
      aria-live="polite"
    >
      {toastMsg}
    </div>
  );
}
