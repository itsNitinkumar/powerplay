'use client';

import React, { useRef, useState, useEffect } from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

function SimilarStayCard({
  s,
}: {
  s: { img: string; t: string; price: string | number; rating: string | number };
}) {
  return (
    <div className="_YyLznY">
      <img src={`/assets/images/${s.img}.jpeg`} alt="" loading="lazy" />
      <div className="_JwWFHq">{s.t}</div>
      <div className="p">
        {listingData.currency}
        {s.price} &nbsp; <Icon name="star" className="star" /> {s.rating}
      </div>
    </div>
  );
}

export default function SimilarStays() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const getStep = () =>
    trackRef.current ? trackRef.current.clientWidth * 0.9 : 0;

  const scrollNext = () => {
    trackRef.current?.scrollBy({ left: getStep(), behavior: 'smooth' });
  };

  const scrollPrev = () => {
    trackRef.current?.scrollBy({ left: -getStep(), behavior: 'smooth' });
  };

  const updateState = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
    setTotalPages(pages);
    setPage(Math.min(pages, Math.round(el.scrollLeft / el.clientWidth) + 1));
  };

  useEffect(() => {
    updateState();
    window.addEventListener('resize', updateState);
    return () => window.removeEventListener('resize', updateState);
  }, []);

  return (
    <section className="_WNEjqG">
      <div className="_cixxXf">
        <h2 className="_XZmvOH" style={{ margin: 0 }}>
          More stays nearby
        </h2>
        <div className="_FFRFIT">
          <span className="_klVRbI">
            {page} / {totalPages}
          </span>
          <button
            className="_kxdode"
            id="simPrev"
            disabled={atStart}
            onClick={scrollPrev}
          >
            <Icon name="chevronleft" className="ico" />
          </button>
          <button
            className="_kxdode"
            id="simNext"
            disabled={atEnd}
            onClick={scrollNext}
          >
            <Icon name="chevronright" className="ico" />
          </button>
        </div>
      </div>
      <div
        className="_duSenM"
        id="simTrack"
        ref={trackRef}
        onScroll={updateState}
      >
        {listingData.similar.map((s, idx) => (
          <SimilarStayCard key={idx} s={s} />
        ))}
      </div>
    </section>
  );
}
