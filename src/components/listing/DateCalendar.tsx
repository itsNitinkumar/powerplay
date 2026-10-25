'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading, Divider } from '@/components/ui/SectionHeading';

interface CalendarDay {
  day: number;
  month: number;
  year: number;
  disabled?: boolean;
  inRange?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

interface MonthCalendarProps {
  month: number;
  year: number;
  checkIn?: { day: number; month: number; year: number };
  checkOut?: { day: number; month: number; year: number };
}

function MonthCalendar({ month, year, checkIn, checkOut }: MonthCalendarProps) {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const today = new Date();

  function isInRange(day: number) {
    if (!checkIn || !checkOut) return false;
    const d = new Date(year, month, day);
    const start = new Date(checkIn.year, checkIn.month, checkIn.day);
    const end = new Date(checkOut.year, checkOut.month, checkOut.day);
    return d > start && d < end;
  }

  function isStart(day: number) {
    return !!(checkIn && checkIn.month === month && checkIn.year === year && checkIn.day === day);
  }

  function isEnd(day: number) {
    return !!(checkOut && checkOut.month === month && checkOut.year === year && checkOut.day === day);
  }

  function isPast(day: number) {
    return new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex-1">
      <h3 className="text-base font-semibold text-center mb-4">
        {MONTHS[month]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map(d => (
          <div key={d} className="text-center text-xs font-medium text-[#717171] h-8 flex items-center justify-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const past = isPast(day);
          const start = isStart(day);
          const end = isEnd(day);
          const inRange = isInRange(day);

          let bg = '';
          let text = past ? 'text-[#DDDDDD]' : 'text-[#222]';
          let rounded = 'rounded-full';

          if (start || end) {
            bg = 'bg-[#222]';
            text = 'text-white';
          } else if (inRange) {
            bg = 'bg-[#F0F0F0]';
            rounded = 'rounded-none';
          }

          return (
            <div
              key={day}
              className={`h-10 flex items-center justify-center text-sm ${rounded} ${bg} ${text} ${past ? 'cursor-not-allowed' : 'cursor-default hover:border hover:border-[#222]'}`}
              aria-label={`${MONTHS[month]} ${day}, ${year}${start ? ' (check-in)' : end ? ' (check-out)' : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DateCalendar() {
  const [viewOffset, setViewOffset] = useState(0);

  // Show Oct + Nov 2026 by default (matching reference)
  const baseYear = 2026;
  const baseMonth = 9; // October (0-indexed)

  const leftMonth = (baseMonth + viewOffset) % 12;
  const leftYear = baseYear + Math.floor((baseMonth + viewOffset) / 12);
  const rightMonth = (baseMonth + viewOffset + 1) % 12;
  const rightYear = baseYear + Math.floor((baseMonth + viewOffset + 1) / 12);

  const checkIn = { day: 10, month: 9, year: 2026 };
  const checkOut = { day: 15, month: 9, year: 2026 };

  return (
    <section aria-labelledby="dates-heading" className="space-y-4">
      <SectionHeading id="dates-heading">
        {Math.round(
          (new Date(checkOut.year, checkOut.month, checkOut.day).getTime() -
            new Date(checkIn.year, checkIn.month, checkIn.day).getTime()) /
            (1000 * 60 * 60 * 24)
        )}{' '}
        nights in {listing.location.split(',')[0]}
      </SectionHeading>

      <p className="text-[#717171] text-sm">
        {new Date(checkIn.year, checkIn.month, checkIn.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} –{' '}
        {new Date(checkOut.year, checkOut.month, checkOut.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>

      <div className="border border-[#DDDDDD] rounded-2xl p-6">
        {/* Calendar navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setViewOffset(v => v - 1)}
            aria-label="Previous month"
            className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            onClick={() => setViewOffset(v => v + 1)}
            aria-label="Next month"
            className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C]"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex gap-8">
          <MonthCalendar
            month={leftMonth}
            year={leftYear}
            checkIn={checkIn}
            checkOut={checkOut}
          />
          <div className="w-px bg-[#DDDDDD] self-stretch" aria-hidden="true" />
          <MonthCalendar
            month={rightMonth}
            year={rightYear}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="text-sm font-semibold text-[#222] underline hover:no-underline focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm">
            Clear dates
          </button>
        </div>
      </div>

      <Divider className="mt-6" />
    </section>
  );
}

// Import listing at bottom to avoid circular
import { listing } from '@/data/listing';
