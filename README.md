# Playpower Labs Take-Home Assignment — Airbnb Listing Clone

An exact desktop clone of the Airbnb listing page: **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"**, matching the visual styling, animations, interactions, and keyboard accessibility of the reference specification.

Reference: [https://airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app)

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + Custom CSS Tokens
- **Icons**: Original clean SVG set via [`lucide-react`](https://lucide.dev/)
- **Font**: Airbnb Cereal Variable Font (`AirbnbCerealVF.woff2`)
- **Testing**: [Jest](https://jestjs.io/) + [@testing-library/react](https://testing-library.com/) + [jsdom](https://github.com/jsdom/jsdom)

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js >= 18 (developed with Node.js v26.12.0)
- npm >= 9

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production-optimized static bundle |
| `npm run start` | Serve production build locally |
| `npm run typecheck` | Run strict TypeScript compiler verification |
| `npm run lint` | Run Next.js ESLint verification |
| `npm test` | Run complete unit and integration test suites |

---

## 📐 Architecture & Key Features

### 1. Three Core Views
1. **Desktop Listing Page**:
   - Fixed header with Airbnb branding, pill search trigger, host actions, and secondary anchor navigation row visible on scroll.
   - Title row with real-time Save to Wishlist toggle and Web Share API with clipboard fallback.
   - 5-image hero grid with rounded outer corners and "Show all photos" trigger.
   - Property summary with custom Guest Favourite laurel badge, highlights, and room breakdown.
   - Expandable description with language toggle.
   - Where you'll sleep bedroom card.
   - Amenities grid (top 10 standout items) + modal viewing all 50 categorized amenities.
   - Dual-month interactive calendar (October & November 2026 default).
   - Rating breakdown bars and verified guest reviews.
   - Location preview with map styling and neighborhood description.
   - Host & co-hosts section with interactive "Message Host" feedback.
   - House rules, safety & cancellation policy sections.
   - Nearby stays carousel with left/right scroll controls.
   - Sticky reservation widget with dynamic price calculations and discount badge.

2. **Photo Tour Overlay**:
   - Full-screen view opened from "Show all photos" or hero grid images.
   - Fixed top bar with back navigation, centered title, and share/favorite buttons.
   - Horizontal category chips that scroll smoothly to respective room sections.
   - All 43 photos grouped by room category (Living room, Jacuzzi / Bathroom, Bedroom, Full kitchen, Gym, Pool, Exterior, Additional photos).
   - Focus trapped within overlay; background scrolling prevented.

3. **Lightbox Overlay**:
   - Single-photo viewer with `object-fit: contain` (no cropping).
   - "X of 43" counter and close control.
   - Grid icon navigation seamlessly returning to the Photo Tour at the active category.
   - Prev / Next circular controls with boundary state disabling.
   - Full keyboard controls: `←` (previous), `→` (next), `Escape` (close).
   - Full accessibility focus trap and focus restoration to trigger element upon closing.

### 2. Single Source of Truth
All listing data (title, ratings, prices, 43 gallery images, 50 amenities, reviews, host info, policies, nearby stays) is strongly typed and centralized in [`src/data/listing.ts`](src/data/listing.ts).

---

## ♿ Accessibility Features

- **Semantic HTML**: Proper `<header>`, `<main>`, `<aside>`, `<footer>`, `<nav>`, `<article>`, and `<section>` landmarks.
- **Heading Hierarchy**: Logical `h1` through `h4` hierarchy throughout the document.
- **Keyboard Navigation**: All interactive elements (hero images, carousel buttons, modal triggers) are keyboard focusable with high-contrast `:focus-visible` rings.
- **Focus Trap & Restoration**: Active overlays (`PhotoTour`, `Lightbox`, `AmenitiesModal`) trap tab navigation inside the modal and return focus to the opening element when closed.
- **Screen Reader Announcements**: Live region (`aria-live="polite"`) announcements for photo counters, share toasts, and reservation feedback.
- **Reduced Motion**: Respects `prefers-reduced-motion` via custom CSS animations override.

---

## 📁 Project Structure

```
├── public/                 # Static assets (fonts, 43 images, avatars, chips, ui icons)
├── src/
│   ├── app/                # App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/
│   │   ├── listing/        # Main page sections (Header, HeroGallery, ReservationCard, etc.)
│   │   ├── overlays/       # PhotoTour, Lightbox modal views
│   │   └── ui/             # Reusable primitives (Button, IconButton, SectionHeading, etc.)
│   ├── data/               # Strongly-typed listing data (listing.ts)
│   └── types/              # TypeScript interfaces (GalleryPhoto, Amenity, Review, etc.)
├── docs/                   # Implementation plan, system architecture, audit, and prompts
│   ├── implementation-plan.md
│   ├── architecture.md
│   ├── architecture.svg
│   ├── ai-prompts.md
│   └── final-audit.md
├── __tests__/              # Jest & React Testing Library test suites
└── package.json
```

---

## ⚠️ Limitations & Notes

- **Desktop Target**: Built specifically for desktop viewports (1280px and 1440px targets) in accordance with the assignment specifications.
- **Local State**: All interactions (booking, dates, wishlist saving, messages) operate locally in state without requiring a live backend.
