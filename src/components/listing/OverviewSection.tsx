'use client';

import React from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';
import HtmlBlock from '@/components/ui/HtmlBlock';

export function StarRating({ n }: { n: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" />
      ))}
    </>
  );
}

export function OverviewSummary() {
  return (
    <div className="_gRekoP">
      <h2>{listingData.overview.kind}</h2>
      <HtmlBlock className="_ooNURW" html={listingData.overview.facts} />
    </div>
  );
}

export function GuestFavouriteBadge() {
  return (
    <div className="_NIsTQW">
      <div className="_pHrBSW">
        <Icon name="laurel" className="_loDmux" />
        <span className="_MiwVlJ">
          Guest
          <br />
          favourite
        </span>
        <Icon name="laurel" className="_loDmux _wJAzrb" />
      </div>
      <div className="_XofkZZ">
        One of the most loved homes on Airbnb, according to guests
      </div>
      <div className="_HxhaNo">
        <div className="_WpbHyo">
          <div className="_NQUHke">{listingData.rating}</div>
          <div className="_XJKtyD">
            <StarRating n={5} />
          </div>
        </div>
        <div className="_ZOPyus" />
        <div className="_WpbHyo">
          <div className="_NQUHke">{listingData.reviewCount}</div>
          <div className="_tAbhrW">Reviews</div>
        </div>
      </div>
    </div>
  );
}

export function HostSummary() {
  return (
    <div className="_McRwJR">
      <img
        className="_ahDDBA"
        src={`/assets/images/${listingData.host.avatar}.jpeg`}
        alt=""
      />
      <div>
        <div className="_ZWkpdw">Hosted by {listingData.host.name}</div>
        <div className="meta">{listingData.host.years} years hosting</div>
      </div>
    </div>
  );
}
