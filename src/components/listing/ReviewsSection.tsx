'use client';

import React, { useState } from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';
import { StarRating } from './OverviewSection';

function ReviewsHeader() {
  return (
    <div className="_mXHiZG">
      <div className="_IPHKNm">
        <img src="/assets/images/ui/laurel-left.png" alt="" />
        <div className="_acYbbH">{listingData.rating}</div>
        <img src="/assets/images/ui/laurel-right.png" alt="" />
      </div>
      <div className="_MJJFdY">Guest favourite</div>
      <div className="_dVnTwq">
        This home is a guest favourite based on ratings, reviews and reliability
      </div>
      <button className="_cOOOjN" onClick={e => e.preventDefault()}>
        How reviews work
      </button>
    </div>
  );
}

function RatingBreakdownBar({ b }: { b: { s: number; pct: number } }) {
  return (
    <div className="_KehdAH">
      <span className="_XNAevj">{b.s}</span>
      <div className="_qsXuOf">
        <div className="_yIfKfd" style={{ width: `${b.pct}%` }} />
      </div>
    </div>
  );
}

function RatingCategory({
  cat,
}: {
  cat: { t: string; v: string; icon: string };
}) {
  return (
    <div className="_ygNjbZ">
      <div className="_GpOufr">{cat.t}</div>
      <div className="_kkCObW">{cat.v}</div>
      <Icon name={cat.icon} className="ico" tag="div" />
    </div>
  );
}

function ReviewChip({ ch }: { ch: { t: string; n: number } }) {
  const slug = ch.t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <button className="_fghUgF" onClick={e => e.preventDefault()}>
      <img
        className="_WevcZP"
        src={`/assets/images/chips/${slug}.png`}
        alt=""
        aria-hidden="true"
      />
      {ch.t} <span className="_nrzMKB">{ch.n}</span>
    </button>
  );
}

function ReviewCard({ rvw }: { rvw: any }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = rvw.text.length > 170;

  return (
    <div className="_OxFhJw">
      <div className="head">
        {rvw.img ? (
          <img
            className="_nCtqsh"
            src={`/assets/images/${rvw.img}.jpeg`}
            alt=""
          />
        ) : (
          <div
            className="_VlFmUV"
            style={{ background: rvw.bg, color: rvw.fg }}
          >
            {rvw.initial}
          </div>
        )}
        <div>
          <div className="_ZWkpdw">{rvw.name}</div>
          <div className="_PjSQBI">{rvw.tenure}</div>
        </div>
      </div>
      <div className="_TjrxaG">
        <span className="_XJKtyD">
          <StarRating n={rvw.stars} />
        </span>
        <span>·</span>
        <span>{rvw.when}</span>
      </div>
      <div
        className={`_CfRTjD${isLong && !expanded ? ' _kfKUOt' : ''}`}
        data-full={encodeURIComponent(rvw.text)}
      >
        {rvw.text}
      </div>
      {isLong ? (
        <button className="_lQlyVc" onClick={() => setExpanded(prev => !prev)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </div>
  );
}

export default function ReviewsSection() {
  const r = listingData.reviews;

  return (
    <section className="_WNEjqG" id="reviews">
      <ReviewsHeader />
      <div className="_AiEzWi">
        <div className="_ygNjbZ">
          <div className="_GpOufr">Overall rating</div>
          <div className="_pWibpC">
            {r.breakdown.map((b, idx) => (
              <RatingBreakdownBar key={idx} b={b} />
            ))}
          </div>
        </div>
        {r.categories.map((cat, idx) => (
          <RatingCategory key={idx} cat={cat} />
        ))}
      </div>
      <div className="_rDgNVk">
        {r.chips.map((ch, idx) => (
          <ReviewChip key={idx} ch={ch} />
        ))}
      </div>
      <div className="_RRsDBp">
        {r.list.map((rvw, idx) => (
          <ReviewCard key={idx} rvw={rvw} />
        ))}
      </div>
      <button className="_XZuuKk" onClick={e => e.preventDefault()}>
        Show all {listingData.reviewCount} reviews
      </button>
    </section>
  );
}
