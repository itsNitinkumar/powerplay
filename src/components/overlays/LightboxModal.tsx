'use client';

import React from 'react';
import { useListingContext } from '@/context/ListingContext';
import Icon from '@/components/ui/Icon';

export default function LightboxModal() {
  const { lbIdx, flat, step, back } = useListingContext();
  const isOpen = lbIdx >= 0;
  const photo = isOpen ? flat[lbIdx] : null;

  return (
    <div
      className={`_zFbfbh${isOpen ? ' _PjnNJs' : ''}`}
      id="lightbox"
      aria-hidden={isOpen ? 'false' : 'true'}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <header className="_LWXeEY">
        <button
          className="_CscuGL _bNHEUf"
          type="button"
          aria-label="Show all photos"
          id="lbGrid"
          onClick={back}
        >
          <Icon name="gridicon" />
        </button>
        <div className="_QIemms" id="lbTitle">
          {photo ? photo.room : ''}
        </div>
        <div className="_lVGbrm">
          <span className="_iRDAKc" id="lbCounter">
            {photo ? `${lbIdx + 1} of ${flat.length}` : ''}
          </span>
          <button
            className="lb-close _bNHEUf"
            type="button"
            aria-label="Close"
            id="lbClose"
            onClick={back}
          >
            <Icon name="close" />
          </button>
        </div>
      </header>

      <button
        className="_KNOVTi _VTIXSd _bNHEUf"
        type="button"
        aria-label="Previous"
        id="lbPrev"
        disabled={!isOpen || lbIdx <= 0}
        onClick={() => step(-1)}
      >
        <Icon name="arrowleft" />
      </button>

      <div className="_VPKRNC" id="lbStage">
        {photo ? (
          <img
            key={lbIdx}
            src={`/assets/images/${photo.name}.jpeg`}
            alt={photo.room}
          />
        ) : null}
      </div>

      <button
        className="_KNOVTi _VkQoEV _bNHEUf"
        type="button"
        aria-label="Next"
        id="lbNext"
        disabled={!isOpen || lbIdx >= flat.length - 1}
        onClick={() => step(1)}
      >
        <Icon name="arrowright" />
      </button>
    </div>
  );
}
