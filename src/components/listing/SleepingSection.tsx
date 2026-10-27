'use client';

import React from 'react';
import { listingData } from '@/data/listingData';

function SleepingCard({ s }: { s: { img: string; t: string; d: string } }) {
  return (
    <div className="_nSlVqJ">
      <img src={`/assets/images/${s.img}.jpeg`} alt="" />
      <div className="_JwWFHq">{s.t}</div>
      <div className="_joNbzi">{s.d}</div>
    </div>
  );
}

export default function SleepingSection() {
  return (
    <div className="_QZaLue">
      <h2 className="_XZmvOH">Where you&apos;ll sleep</h2>
      <div className="_OaaNpZ">
        {listingData.sleeping.map((s, idx) => (
          <SleepingCard key={idx} s={s} />
        ))}
      </div>
    </div>
  );
}
