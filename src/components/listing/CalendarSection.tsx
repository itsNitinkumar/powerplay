'use client';

import React from 'react';
import { listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const unavailableNov: Record<number, number> = {
  18: 1,
  19: 1,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  29: 1,
  30: 1,
};

function MonthNav() {
  return (
    <div className="_VXHyjS">
      <button aria-label="Previous month">
        <Icon name="chevronleft" className="ico" />
      </button>
      <button aria-label="Next month">
        <Icon name="chevronright" className="ico" />
      </button>
    </div>
  );
}

function CalendarCell({ n, cls }: { n?: number; cls: string }) {
  return <div className={cls}>{n != null ? n : null}</div>;
}

function MonthCalendar({
  year,
  month,
  range,
  unavailable,
}: {
  year: number;
  month: number;
  range: { start: number; end: number } | null;
  unavailable?: Record<number, number>;
}) {
  const startDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells: { empty?: boolean; n?: number; cls?: string }[] = [];

  for (let i = 0; i < startDay; i++) {
    cells.push({ empty: true });
  }

  for (let d = 1; d <= totalDays; d++) {
    let cls = '_UHweot';
    if (range) {
      if (d === range.start) cls += ' _gTtWjP';
      else if (d === range.end) cls += ' _ifYNOn';
      else if (d > range.start && d < range.end) cls += ' _lIMKSn';
    }
    if (unavailable && unavailable[d]) {
      cls += ' _FXEbnd';
    }
    cells.push({ n: d, cls });
  }

  return (
    <div className="_DSpFpO">
      <div className="_JyICyg">
        {monthNames[month]} {year}
      </div>
      <div className="_FnrmaC">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>
      <div className="_eeeBPf">
        {cells.map((c, i) =>
          c.empty ? (
            <CalendarCell key={i} cls="_UHweot _cvZNKV" />
          ) : (
            <CalendarCell key={i} n={c.n} cls={c.cls!} />
          )
        )}
      </div>
    </div>
  );
}

export default function CalendarSection() {
  return (
    <div className="_QZaLue">
      <div>
        <div className="_zAWnNQ">
          <div className="_JwWFHq">{listingData.nights} nights in Candolim</div>
          <div className="_joNbzi">18 Oct 2026 - 23 Oct 2026</div>
        </div>
        <div className="_jjUQkB">
          <MonthNav />
          <MonthCalendar
            year={2026}
            month={9}
            range={{ start: 18, end: 23 }}
            unavailable={{}}
          />
          <MonthCalendar
            year={2026}
            month={10}
            range={null}
            unavailable={unavailableNov}
          />
        </div>
        <div className="_pWGlTJ">
          <span className="_ZjQoRK" aria-hidden="true">
            <svg
              viewBox="0 0 32 22"
              width="20"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <rect x="1" y="1" width="30" height="20" rx="3" />
              <path d="M6 7h.01M11 7h.01M16 7h.01M21 7h.01M26 7h.01M6 12h.01M26 12h.01M9 16h14" />
            </svg>
          </span>
          <button className="_WKAkzo">Clear dates</button>
        </div>
      </div>
    </div>
  );
}
