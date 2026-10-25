'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Globe, Menu, User, ChevronDown } from 'lucide-react';

const AirbnbLogo = () => (
  <svg
    viewBox="0 0 102 102"
    className="w-8 h-8 fill-[#FF385C]"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M51 0C22.9 0 0 22.9 0 51s22.9 51 51 51 51-22.9 51-51S79.1 0 51 0zm0 20.4c5.1 0 9.2 4.1 9.2 9.2S56.1 38.8 51 38.8s-9.2-4.1-9.2-9.2 4.1-9.2 9.2-9.2zm23.6 56.9c-.3.5-.9.7-1.4.4-3.7-2.3-8.2-3.5-13-3.5-5.7 0-11 1.7-15.4 4.6-.2.2-.5.2-.8.1l-.3-.3c-2.4-5.7-3.8-11.9-3.8-18.4 0-16.3 9.1-30.5 22.6-38.1.5-.3 1.1-.1 1.4.4l16.5 28.5c.3.5.1 1.1-.4 1.4L62.8 60c-.5.3-1.1.1-1.4-.4l-9.6-16.6-9.6 16.6c-.3.5-.9.7-1.4.4L28 53.8c-.5-.3-.7-.9-.4-1.4l16.5-28.5c.3-.5.9-.7 1.4-.4C58.9 31.1 68 45.2 68 61.5c0 6-.9 11.8-2.5 17.3-.1.2-.5.4-.9.5z" />
  </svg>
);

interface HeaderProps {
  scrolled?: boolean;
}

export default function Header({ scrolled }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (scrolled !== undefined) return;
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrolled]);

  const scrolledState = scrolled ?? isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white transition-shadow duration-200 ${
        scrolledState ? 'shadow-[0_1px_0_rgba(0,0,0,0.08)]' : 'border-b border-[#DDDDDD]'
      }`}
      role="banner"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[80px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Airbnb home"
          className="flex items-center gap-1.5 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C] rounded-lg"
        >
          <AirbnbLogo />
          <span className="hidden lg:block text-[#FF385C] text-xl font-bold tracking-tight select-none">
            airbnb
          </span>
        </Link>

        {/* Search pill */}
        <div className="flex-1 max-w-[480px]">
          <button
            className="w-full flex items-center border border-[#DDDDDD] rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200 gap-2 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
            aria-label="Open search"
          >
            <span className="text-sm font-medium text-[#222] truncate">Anywhere</span>
            <span className="w-px h-4 bg-[#DDDDDD] flex-shrink-0" />
            <span className="text-sm font-medium text-[#222] truncate">Anytime</span>
            <span className="w-px h-4 bg-[#DDDDDD] flex-shrink-0" />
            <span className="text-sm text-[#717171] truncate">Add guests</span>
            <span className="ml-auto bg-[#FF385C] text-white rounded-full p-2 flex-shrink-0 group-hover:bg-[#E31C5F] transition-colors">
              <Search size={14} aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Right nav */}
        <nav className="flex items-center gap-1" aria-label="User navigation">
          <a
            href="#"
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-[#222] hover:bg-[#F7F7F7] px-3 py-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C] whitespace-nowrap"
          >
            Become a Host
          </a>
          <button
            aria-label="Select language and currency"
            className="hidden md:flex items-center p-2.5 rounded-full hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
          >
            <Globe size={18} aria-hidden="true" />
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label="Open user menu"
            onClick={() => setMenuOpen(v => !v)}
            className="relative flex items-center gap-2 border border-[#DDDDDD] rounded-full px-3 py-1.5 hover:shadow-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]"
          >
            <Menu size={16} aria-hidden="true" />
            <div className="w-7 h-7 rounded-full bg-[#717171] flex items-center justify-center overflow-hidden">
              <User size={16} className="text-white" aria-hidden="true" />
            </div>
          </button>
        </nav>
      </div>

      {/* Nav anchors row — visible when scrolled on listing page */}
      {scrolledState && (
        <div className="border-t border-[#DDDDDD]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center gap-6 h-[52px] overflow-x-auto no-scrollbar">
            {[
              { label: 'Photos', href: '#photos' },
              { label: 'Amenities', href: '#amenities' },
              { label: 'Reviews', href: '#reviews' },
              { label: 'Location', href: '#location' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-[#222] border-b-2 border-transparent hover:border-[#222] pb-1 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#FF385C] focus-visible:rounded-sm"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
