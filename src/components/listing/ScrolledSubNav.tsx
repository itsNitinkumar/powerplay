'use client';

import React, { useState, useEffect } from 'react';
import { useListingContext } from '@/context/ListingContext';
import { listingData } from '@/data/listingData';

const navSections = [
  { target: 'photos', label: 'Photos' },
  { target: 'amenities', label: 'Amenities' },
  { target: 'reviews', label: 'Reviews' },
  { target: 'location', label: 'Location' },
];

export default function ScrolledSubNav() {
  const { toast } = useListingContext();
  const [visible, setVisible] = useState(false);
  const [activeTarget, setActiveTarget] = useState('photos');

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('_Zndiww');
      if (!hero) return;
      setVisible(window.scrollY > hero.offsetTop + hero.offsetHeight - 40);

      const probe = window.scrollY + 120;
      let cur = 'photos';
      navSections.forEach(item => {
        const el = document.getElementById(item.target);
        if (el && el.offsetTop <= probe) {
          cur = el.id;
        }
      });
      setActiveTarget(cur);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={`_JXzroy${visible ? ' _fTQmRt' : ''}`}
      id="_JXzroy"
      aria-hidden={visible ? 'false' : 'true'}
    >
      <div className="_Zudfyi">
        <nav className="_hCwPJL" aria-label="Listing sections">
          {navSections.map(item => (
            <a
              key={item.target}
              href={`#${item.target}`}
              data-target={item.target}
              className={activeTarget === item.target ? '_KOWlKT' : undefined}
              onClick={e => scrollTo(e, item.target)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="_YRQCMM">
          <div className="_KQgxsf">
            <div>
              <span className="_aykCAY">
                {listingData.currency}
                {listingData.price}
              </span>{' '}
              <span className="_FVmwas">for {listingData.nights} nights</span>
            </div>
            <div className="_CBhLfH">
              <span className="_QdaeUh" aria-hidden="true" /> {listingData.rating} ·{' '}
              <span className="sn-reviews">{listingData.reviewCount} reviews</span>
            </div>
          </div>
          <button
            className="_NhmiWB _jCniyC"
            type="button"
            onClick={() => toast("You won't be charged yet")}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
