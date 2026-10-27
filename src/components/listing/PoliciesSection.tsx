'use client';

import React from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';
import HtmlBlock from '@/components/ui/HtmlBlock';

function PolicyCard({
  p,
}: {
  p: { icon: string; t: string; lines: string[] };
}) {
  return (
    <div className="_BTCYex">
      <Icon name={p.icon} className="ico" tag="div" />
      <div className="_JwWFHq">{p.t}</div>
      {p.lines.map((line, idx) => (
        <HtmlBlock key={idx} tag="p" html={line} />
      ))}
      <a className="_pKwVzP" href="#" onClick={e => e.preventDefault()}>
        Learn more
      </a>
    </div>
  );
}

export default function PoliciesSection() {
  return (
    <section className="_WNEjqG">
      <h2 className="_XZmvOH">Things to know</h2>
      <div className="_qYvLOs">
        {listingData.policies.map((p, idx) => (
          <PolicyCard key={idx} p={p} />
        ))}
      </div>
    </section>
  );
}
