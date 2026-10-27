'use client';

import React from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

function HostStatBox({ num, lbl }: { num: any; lbl: string }) {
  return (
    <div className="_uAiafM">
      <div className="_NQUHke">{num}</div>
      <div className="_tAbhrW">{lbl}</div>
    </div>
  );
}

function HostBadgeCard() {
  const h = listingData.host;
  return (
    <div className="_jdcHSj">
      <div className="_FtSmek">
        <div className="_ynznJE">
          <img src={`/assets/images/${h.avatar}.jpeg`} alt="" />
          {h.superhost ? <Icon name="check" className="_LRcFYN" /> : null}
        </div>
        <div className="_IPinhY">{h.name}</div>
        <div className="_kuaAPu">Host</div>
      </div>
      <div className="_MgwXXd">
        <HostStatBox num={h.reviews} lbl="Reviews" />
        <HostStatBox num={h.rating + '★'} lbl="Rating" />
        <HostStatBox num={h.years} lbl="Years hosting" />
      </div>
    </div>
  );
}

function HostFactLine({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="_mTFISQ">
      <Icon name={icon} className="ico" />
      {text}
    </div>
  );
}

function CoHostBadge({ ch }: { ch: any }) {
  return (
    <div className="_wnLgSM">
      {ch.img ? (
        <img
          src={`/assets/images/${ch.img}${ch.img.indexOf('co') > -1 ? '.jpg' : '.jpeg'}`}
          alt=""
        />
      ) : (
        <div className="_vGeoQY" style={{ background: ch.bg, color: ch.fg }}>
          {ch.initial}
        </div>
      )}
      <span>{ch.name}</span>
    </div>
  );
}

export default function HostSection() {
  const h = listingData.host;

  return (
    <section className="_WNEjqG">
      <h2 className="_XZmvOH">Meet your host</h2>
      <div className="_UiBrsI">
        <div>
          <HostBadgeCard />
          <div className="_CTUlZl">
            <HostFactLine icon="born" text={h.facts[0]} />
            <HostFactLine icon="school" text={h.facts[1]} />
          </div>
        </div>
        <div>
          <div className="_xvXhkf">Co-Hosts</div>
          <div className="_eYdTlY">
            {h.coHosts.map((ch, idx) => (
              <CoHostBadge key={idx} ch={ch} />
            ))}
          </div>
          <div className="_vQegXe">Host details</div>
          <div className="_gOWKSk">
            Response rate: {h.responseRate}
            <br />
            {h.responseTime}
          </div>
          <button className="_egLfkO" onClick={e => e.preventDefault()}>
            Message host
          </button>
          <div className="_ZOpPkY">
            <Icon name="shield" className="ico" />
            <span>
              To help protect your payment, always use Airbnb to send money and
              communicate with hosts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
