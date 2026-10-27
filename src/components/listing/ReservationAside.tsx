'use client';

import React from 'react';
import { useListingContext } from '@/context/ListingContext';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

function DiscountCard() {
  return (
    <div className="_bJChEA">
      <img
        className="_hbNVom"
        src="/assets/images/ui/discount.svg"
        alt=""
        aria-hidden="true"
      />
      <div className="_erTcst">
        Get 10% off your next stay.
        <br />
        <a href="#" onClick={e => e.preventDefault()}>
          Terms apply
        </a>
      </div>
      <button className="_Spojam" type="button">
        Claim
      </button>
    </div>
  );
}

function ReservationField({ label, value }: { label: string; value: string }) {
  return (
    <div className="_NdLgZo">
      <div className="_mvnlYS">{label}</div>
      <div className="_vUECFC">{value}</div>
    </div>
  );
}

function ReservationForm() {
  const { toast } = useListingContext();

  return (
    <div className="_ehfyuX">
      <div className="_HEyPzI">
        <span className="_AjpxES">
          {listingData.currency}
          {listingData.price}
        </span>
        <span className="_kNZPIK">for {listingData.nights} nights</span>
      </div>
      <div className="_GLDaPq">
        <div className="_IJyfOk">
          <ReservationField label="CHECK-IN" value={listingData.checkIn} />
          <ReservationField label="CHECKOUT" value={listingData.checkOut} />
        </div>
        <div className="_FiFzqL">
          <div>
            <div className="_mvnlYS">GUESTS</div>
            <div className="_vUECFC">{listingData.guests}</div>
          </div>
          <Icon name="chevrondown" className="_SrOOll" />
        </div>
      </div>
      <div className="_MMdioP">
        Free cancellation before <b>17 October</b>
      </div>
      <button
        className="_NhmiWB _YkNyTO"
        type="button"
        id="reserveBtn"
        onClick={() => toast("You won't be charged yet")}
      >
        Reserve
      </button>
      <div className="_mtuwgH">You won&apos;t be charged yet</div>
    </div>
  );
}

function ReportListing() {
  return (
    <div className="_jcEuOw">
      <Icon name="flag" className="ico" />
      <a href="#" onClick={e => e.preventDefault()}>
        Report this listing
      </a>
    </div>
  );
}

export default function ReservationAside() {
  return (
    <div className="_bUsxCi" id="bookingSticky">
      <DiscountCard />
      <ReservationForm />
      <ReportListing />
    </div>
  );
}
