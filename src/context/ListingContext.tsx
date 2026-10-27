'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { tourData } from '@/data/listingData';
import PhotoTourModal from '@/components/overlays/PhotoTourModal';
import LightboxModal from '@/components/overlays/LightboxModal';
import AmenitiesModal from '@/components/overlays/AmenitiesModal';
import Toast from '@/components/ui/Toast';

export interface FlatPhoto {
  name: string;
  room: string;
  roomIndex: number;
}

interface ListingContextType {
  flat: FlatPhoto[];
  roomStartIndex: number[];
  tourOpen: boolean;
  tourScrollRoom: number | null;
  lbIdx: number;
  amenOpen: boolean;
  toastMsg: string;
  toastShow: boolean;
  openTour: (roomIndex?: number | null, triggerEl?: HTMLElement | null) => void;
  openLightbox: (index: number, triggerEl?: HTMLElement | null) => void;
  step: (delta: number) => void;
  openAmen: (triggerEl?: HTMLElement | null) => void;
  closeAmen: () => void;
  toast: (msg: string) => void;
  back: () => void;
}

const ListingContext = createContext<ListingContextType>({
  flat: [],
  roomStartIndex: [],
  tourOpen: false,
  tourScrollRoom: null,
  lbIdx: -1,
  amenOpen: false,
  toastMsg: '',
  toastShow: false,
  openTour: () => {},
  openLightbox: () => {},
  step: () => {},
  openAmen: () => {},
  closeAmen: () => {},
  toast: () => {},
  back: () => {},
});

export const useListingContext = () => useContext(ListingContext);

function flattenRooms() {
  const flat: FlatPhoto[] = [];
  const roomStartIndex: number[] = [];
  tourData.rooms.forEach((room: any, ri: number) => {
    roomStartIndex[ri] = flat.length;
    room.blocks.forEach((block: any) => {
      block.imgs.forEach((img: string) => {
        flat.push({ name: img, room: room.t, roomIndex: ri });
      });
    });
  });
  return { flat, roomStartIndex };
}

function updateUrl(paramsToSet: Record<string, string>, paramsToRemove?: string[]) {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  Object.keys(paramsToSet || {}).forEach(k => url.searchParams.set(k, paramsToSet[k]));
  (paramsToRemove || []).forEach(k => url.searchParams.delete(k));
  return url.pathname + url.search;
}

export function ListingProvider({ children }: { children: React.ReactNode }) {
  const { flat, roomStartIndex } = useMemo(() => flattenRooms(), []);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourScrollRoom, setTourScrollRoom] = useState<number | null>(null);
  const [lbIdx, setLbIdx] = useState(-1);
  const [amenOpen, setAmenOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);

  const tourTriggerRef = useRef<HTMLElement | null>(null);
  const lbTriggerRef = useRef<HTMLElement | null>(null);
  const amenTriggerRef = useRef<HTMLElement | null>(null);
  const toastTimerRef = useRef<any>(null);

  const back = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  const openTour = useCallback((roomIndex?: number | null, triggerEl?: HTMLElement | null) => {
    tourTriggerRef.current = triggerEl || (document.activeElement as HTMLElement);
    setTourScrollRoom(typeof roomIndex === 'number' ? roomIndex : null);
    setTourOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState(
        { level: '_KpcKWX' },
        '',
        updateUrl({ modal: 'PHOTO_TOUR_SCROLLABLE' }, ['modalItem'])
      );
    }
  }, []);

  const openLightbox = useCallback((index: number, triggerEl?: HTMLElement | null) => {
    lbTriggerRef.current = triggerEl || (document.activeElement as HTMLElement);
    setTourOpen(true);
    setLbIdx(index);
    if (typeof window !== 'undefined') {
      const modalItem = String(1000 + index);
      window.history.pushState(
        { level: '_zFbfbh', idx: index },
        '',
        updateUrl({ modal: 'PHOTO_TOUR_SCROLLABLE', modalItem })
      );
    }
  }, []);

  const step = useCallback((delta: number) => {
    setLbIdx(prevIdx => {
      const nextIdx = prevIdx + delta;
      if (nextIdx < 0 || nextIdx >= flat.length) return prevIdx;
      if (typeof window !== 'undefined') {
        const modalItem = String(1000 + nextIdx);
        window.history.replaceState(
          { level: '_zFbfbh', idx: nextIdx },
          '',
          updateUrl({ modal: 'PHOTO_TOUR_SCROLLABLE', modalItem })
        );
      }
      return nextIdx;
    });
  }, [flat.length]);

  const openAmen = useCallback((triggerEl?: HTMLElement | null) => {
    amenTriggerRef.current = triggerEl || (document.activeElement as HTMLElement);
    setAmenOpen(true);
  }, []);

  const closeAmen = useCallback(() => {
    setAmenOpen(false);
    const el = amenTriggerRef.current;
    if (el && el.focus) {
      setTimeout(() => el.focus(), 0);
    }
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastShow(false), 1800);
  }, []);

  // URL sync & popstate handler
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.history.replaceState({ level: '_zcNtKV' }, '', window.location.pathname + window.location.search);
    const params = new URLSearchParams(window.location.search);
    const modal = params.get('modal') || params.get('_mdAcnz');
    if (modal === 'PHOTO_TOUR_SCROLLABLE') {
      openTour(null);
      const modalItem = params.get('modalItem');
      if (modalItem) {
        const idx = parseInt(modalItem, 10) - 1000;
        if (idx >= 0 && idx < flat.length) {
          openLightbox(idx);
        }
      }
    }

    const popstateHandler = (e: PopStateEvent) => {
      const level = e.state?.level || '_zcNtKV';
      if (level === '_zcNtKV') {
        setLbIdx(-1);
        setTourOpen(false);
      } else if (level === '_KpcKWX') {
        setLbIdx(-1);
        setTourOpen(true);
      } else if (level === '_zFbfbh') {
        setTourOpen(true);
        setLbIdx(e.state.idx);
      }
    };
    window.addEventListener('popstate', popstateHandler);

    const keydownHandler = (e: KeyboardEvent) => {
      const lightbox = document.getElementById('lightbox');
      const tour = document.getElementById('_KpcKWX');
      const amen = document.getElementById('amenModal');

      if (lightbox && lightbox.classList.contains('_PjnNJs')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          window.history.back();
        } else if (e.key === 'ArrowLeft') {
          step(-1);
        } else if (e.key === 'ArrowRight') {
          step(1);
        }
        return;
      }
      if (tour && tour.classList.contains('_PjnNJs')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          window.history.back();
        }
        return;
      }
      if (amen && amen.classList.contains('_PjnNJs')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeAmen();
        }
      }
    };
    document.addEventListener('keydown', keydownHandler);

    const kbdAdd = (e: KeyboardEvent) => {
      if (e.key === 'Tab') document.body.classList.add('kbd');
    };
    const kbdRemove = () => document.body.classList.remove('kbd');

    window.addEventListener('keydown', kbdAdd);
    window.addEventListener('mousedown', kbdRemove);

    return () => {
      window.removeEventListener('popstate', popstateHandler);
      document.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('keydown', kbdAdd);
      window.removeEventListener('mousedown', kbdRemove);
    };
  }, [flat.length, openTour, openLightbox, step, closeAmen]);

  // Body overflow toggle
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('_pINcte', tourOpen || lbIdx >= 0 || amenOpen);
    }
  }, [tourOpen, lbIdx, amenOpen]);

  const value = {
    flat,
    roomStartIndex,
    tourOpen,
    tourScrollRoom,
    lbIdx,
    amenOpen,
    toastMsg,
    toastShow,
    openTour,
    openLightbox,
    step,
    openAmen,
    closeAmen,
    toast,
    back,
  };

  return (
    <ListingContext.Provider value={value}>
      <div id="root">
        {children}
        <PhotoTourModal />
        <LightboxModal />
        <AmenitiesModal />
        <Toast />
      </div>
    </ListingContext.Provider>
  );
}

export default ListingProvider;
