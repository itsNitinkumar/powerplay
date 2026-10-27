'use client';

import React, { useRef, useEffect } from 'react';
import { useListingContext } from '@/context/ListingContext';
import { tourData, listingData } from '@/data/listingData';
import Icon from '@/components/ui/Icon';

interface TourNavButtonProps {
  room: any;
  onClick: () => void;
}

function TourNavButton({ room, onClick }: TourNavButtonProps) {
  const firstImg = room.blocks[0].imgs[0];
  return (
    <button className="_gKVFNL" type="button" aria-label={room.t} onClick={onClick}>
      <img loading="lazy" alt="" src={`/assets/images/${firstImg}.jpeg`} />
      <span className="_tAbhrW">{room.t}</span>
    </button>
  );
}

interface TourImageProps {
  index: number;
  name: string;
  roomTitle: string;
}

function TourImage({ index, name, roomTitle }: TourImageProps) {
  const { openLightbox } = useListingContext();
  return (
    <button
      className="_GXrMIo"
      type="button"
      data-idx={index}
      aria-label={`${listingData.title} image ${index + 1}`}
      onClick={e => openLightbox(index, e.currentTarget)}
    >
      <img loading="lazy" alt={roomTitle} src={`/assets/images/${name}.jpeg`} />
    </button>
  );
}

interface TourBlockProps {
  block: any;
  baseIndex: number;
  roomTitle: string;
}

function TourBlock({ block, baseIndex, roomTitle }: TourBlockProps) {
  return (
    <div className={`_wdcjGJ ${block.f === 'ONE_LANDSCAPE' ? '_vmCONz' : '_DLVRjk'}`}>
      {block.imgs.map((imgName: string, idx: number) => (
        <TourImage
          key={idx}
          index={baseIndex + idx}
          name={imgName}
          roomTitle={roomTitle}
        />
      ))}
    </div>
  );
}

interface TourRoomProps {
  room: any;
  ri: number;
  startIndex: number;
}

function TourRoom({ room, ri, startIndex }: TourRoomProps) {
  const hl = room.hl && room.hl.length ? room.hl.join('  ·  ') : '';
  let offset = 0;
  return (
    <section className="_AWcqip" id={`tour-room-${ri}`}>
      <div className="_yZYwUW">
        <div className="_AnkvRF">{room.t}</div>
        {hl ? <div className="_hvJgUS">{hl}</div> : null}
      </div>
      <div className="_MbzoEk">
        {room.blocks.map((block: any, bi: number) => {
          const baseIndex = startIndex + offset;
          offset += block.imgs.length;
          return (
            <TourBlock
              key={bi}
              block={block}
              baseIndex={baseIndex}
              roomTitle={room.t}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function PhotoTourModal() {
  const { tourOpen, tourScrollRoom, roomStartIndex, back } = useListingContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToRoom = (roomIndex: number) => {
    const scrollEl = scrollRef.current;
    const target = document.getElementById(`tour-room-${roomIndex}`);
    if (!scrollEl || !target) return;
    const top =
      target.getBoundingClientRect().top -
      scrollEl.getBoundingClientRect().top +
      scrollEl.scrollTop -
      24;
    scrollEl.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!tourOpen) return;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    if (typeof tourScrollRoom === 'number') {
      requestAnimationFrame(() => {
        const target = document.getElementById(`tour-room-${tourScrollRoom}`);
        if (target) {
          const top =
            target.getBoundingClientRect().top -
            scrollEl.getBoundingClientRect().top +
            scrollEl.scrollTop -
            24;
          scrollEl.scrollTop = Math.max(0, top);
        }
      });
    } else {
      scrollEl.scrollTop = 0;
    }
  }, [tourOpen, tourScrollRoom]);

  return (
    <div
      className={`_KpcKWX${tourOpen ? ' _PjnNJs' : ''}`}
      id="_KpcKWX"
      aria-hidden={tourOpen ? 'false' : 'true'}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
    >
      <header className="_TCWfOg" id="tourBar">
        <button
          className="_ffpbhP _bNHEUf"
          type="button"
          aria-label="Back"
          id="tourBack"
          onClick={back}
        >
          <Icon name="back" />
        </button>
        <h2 className="_usJUoS">Photo tour</h2>
        <div className="_bLFgMg">
          <button className="_bNHEUf" type="button" aria-label="Share">
            <Icon name="share" />
          </button>
          <button className="_bNHEUf" type="button" aria-label="Save">
            <Icon name="heart" />
          </button>
        </div>
      </header>

      <div className="_EpiBQR" id="tourScroll" ref={scrollRef}>
        <div className="_hKlfpJ">
          <nav className="_tHVclZ" id="tourNav" aria-label="Photo categories">
            {tourData.rooms.map((room: any, idx: number) => (
              <TourNavButton
                key={idx}
                room={room}
                onClick={() => scrollToRoom(idx)}
              />
            ))}
          </nav>
          <div className="tour-rooms" id="tourRooms">
            {tourData.rooms.map((room: any, ri: number) => (
              <TourRoom
                key={ri}
                room={room}
                ri={ri}
                startIndex={roomStartIndex[ri]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
