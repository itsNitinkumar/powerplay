'use client';

import React from 'react';
import Icon from '@/components/ui/Icon';

export default function SiteHeader() {
  return (
    <header className="_Ugwssa" id="siteHeader">
      <div className="_HaGluF">
        <a className="logo" href="#" aria-label="Airbnb homepage">
          <Icon name="logo" className="_QEBUFh" />
        </a>

        <div className="_EnWgNg" role="search">
          <button className="_LkdOyD" type="button">
            <img
              className="_yKYFjj"
              src="/assets/images/ui/searchbar-house.png"
              alt=""
              aria-hidden="true"
            />
            Anywhere
          </button>
          <span className="_tYfFja" />
          <button className="_LkdOyD" type="button">
            Anytime
          </button>
          <span className="_tYfFja" />
          <button className="_LkdOyD _finVTK" type="button">
            Add guests
          </button>
          <button className="_HEUMtF" type="button" aria-label="Search" />
        </div>

        <nav className="_PTMeKT">
          <a className="_OubFgU" href="#">
            Become a host
          </a>
          <button className="_CWDueY" type="button" aria-label="Choose a language and currency">
            <Icon name="globe" />
          </button>
          <button className="_CWDueY _CDwKNg" type="button" aria-label="Main navigation menu">
            <Icon name="menu" />
          </button>
        </nav>
      </div>
    </header>
  );
}
