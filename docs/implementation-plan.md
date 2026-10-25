# Implementation Plan — Airbnb Clone (Playpower Labs Take-Home)

## 1. Current Project Findings

### Repository State
- **Starting point**: Empty directory (`/home/nitin/Documents/Intern/playpower/`)
- **Stack chosen**: Next.js 15 (App Router) + TypeScript + Tailwind CSS 3
- **Icon library**: `lucide-react` (MIT licensed, comprehensive icon set)
- **Testing**: Jest + @testing-library/react + jsdom
- **Font**: Airbnb Cereal VF (variable font woff2 provided in assets)
- **Assets available**:
  - 43 JPEG photos for gallery (hyphen-delimited UUIDs)
  - Duplicate copies with underscore-delimited names
  - `/avatars/` — host + co-hosts + reviewer avatars
  - `/chips/` — rating category icon images (cleanliness, accuracy, etc.)
  - `/similar/` — 6 nearby stays images (s1–s6.jpeg)
  - `/ui/` — laurel_left.png, laurel_right.png, searchbar_house.png, discount.svg

### Reference Site Observations (https://airbnb-clone-umber-two.vercel.app)

#### Header
- Height: ~80px fixed/sticky
- White background, bottom border `1px solid #DDDDDD` / shadow on scroll
- Logo: Airbnb red rausch SVG + wordmark "airbnb" in red
- Centered search pill: "Anywhere | Anytime | Add guests" with red search button
- Right: "Become a Host", globe icon, hamburger+avatar menu
- Secondary nav row appears on scroll: Photos · Amenities · Reviews · Location

#### Listing Title Row
- `<h1>` "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"
- Font: ~26px, semibold, color #222222
- Right side: Share (underline, share icon) + Save (underline, heart icon)
- Share uses Web Share API / clipboard fallback
- Save toggles heart to red fill

#### Hero Gallery (5 images)
- Two-column grid, 480px tall
- Left: 1 tall image (spans full height)
- Right: 2×2 grid of 4 smaller images
- `border-radius: 12px` on container, clipping all corners
- Gap: 8px between images
- "Show all photos" button: bottom-right, white bg, dark border, grid icon
- Every image is keyboard-focusable, opens lightbox on click

#### Main Layout
- Two-column: content (flex-1) + sticky reservation card (380px)
- Max content width: ~1120px, centered
- Generous spacing between sections (~48px)
- Thin horizontal dividers `1px #DDDDDD`

#### Reservation Card
- Border, rounded-2xl, shadow
- Price with strikethrough original, current price, `/night`
- Rating + review count inline top right
- Date/guest input box (grid 2×2 + guests row)
- Gradient "Reserve" button (red gradient)
- "You won't be charged yet" text
- Price breakdown: nights × price, service fee, total before taxes
- Discount badge with discount.svg icon
- Sticky at ~100px from top

#### Photo Tour
- Full-screen white overlay, z-index > page
- Top bar: Back ← button, centered "Photo tour" heading, Share + Save right
- Category chips row: scrollable horizontal list
- Gallery sections grouped by room/category
- Each section: heading, photo count, 2-column image grid
- Images open Lightbox on click

#### Lightbox
- Full-screen white viewer
- Top bar: Grid icon (back to tour), centered category title, "X of 43" counter, ✕ close
- Large image: `object-fit: contain`, no crop
- Prev/Next: circular buttons at left/right edges, disabled on boundaries
- Keyboard: ←/→ navigate, Escape closes
- Focus trap inside overlay, focus restored on close
- Subtle opacity/scale animation on open

---

## 2. Component Tree

```
<ListingPage>
  <Header />               — fixed, scrolled state, nav anchor links
  <main>
    <TitleRow />           — h1, Share, Save
    <HeroGallery />        — 5-image grid, Show all photos btn
    <div two-column>
      <div left-column>
        <PropertySummary />    — type, host, guests/rooms stats, GuestFav card, highlights
        <Description />        — expandable text, Show original toggle
        <SleepSection />       — bedroom card
        <Amenities />          — grid of 10 + "Show all 50" modal
        <DateCalendar />       — dual-month calendar (Oct + Nov 2026)
        <Reviews />            — rating bars, review cards, Show all
        <LocationSection />    — map placeholder + description
        <HostSection />        — host profile, co-hosts, message
        <PoliciesSection />    — house rules, safety, cancellation
        <NearbyStays />        — carousel with prev/next
      </div>
      <aside right-column sticky>
        <ReservationCard />    — price, dates, guests, reserve, breakdown
      </aside>
    </div>
  </main>
  <footer />
  <PhotoTour />              — overlay, z-9000
  <Lightbox />               — overlay, z-9999
</ListingPage>
```

### Reusable UI Primitives (`/src/components/ui/`)
- `Button` — variants: primary, secondary, ghost, outline, link
- `IconButton` — variants: ghost, circle, circle-border
- `SectionHeading` — h1-h4 with consistent size scale
- `Divider` — `<hr>` styled
- `Badge` — pill chip
- `ModalShell` — focus trap, keyboard, body scroll lock

---

## 3. Data Model

### ListingData (single source of truth in `/src/data/listing.ts`)

```typescript
interface GalleryPhoto {
  id: string;           // "1" through "43"
  src: string;          // "/images/uuid.jpeg"
  alt: string;          // descriptive text
  category: string;     // "Living room", "Bedroom", etc.
  categoryOrder: number; // sort order for Photo Tour
}

interface Amenity { id, name, icon, category, available, highlight? }
interface Review { id, authorName, authorAvatar, location, date, rating, text, years? }
interface RatingBreakdown { category, score, icon }
interface Host { name, avatar, joinedYear, reviewCount, rating, isSuperhost, responseRate, responseTime, about }
interface CoHost { name, avatar }
interface NearbyStay { id, title, image, location, rating, reviewCount, pricePerNight, nights?, dates?, isFavorite? }
interface HouseRule { icon, text }
interface ListingData { ...all listing fields... }
```

---

## 4. Application States

| State | Type | Location |
|-------|------|----------|
| `overlay` | `OverlayState` | `ListingPage` |
| `saved` | boolean | `ListingPage` |
| `headerScrolled` | boolean | `ListingPage` |
| `descriptionExpanded` | boolean | `Description` |
| `showOriginal` | boolean | `Description` |
| `amenitiesModalOpen` | boolean | `Amenities` |
| `reviewsExpanded` | boolean | `Reviews` |
| `cancellationExpanded` | boolean | `PoliciesSection` |
| `nearbyCarouselOffset` | number | `NearbyStays` |
| `calendarViewOffset` | number | `DateCalendar` |
| `reservationFeedback` | string | `ReservationCard` |

### OverlayState union:
```typescript
type OverlayState =
  | { type: 'none' }
  | { type: 'photo-tour'; startCategory?: string }
  | { type: 'lightbox'; photoIndex: number; fromTour?: boolean };
```

---

## 5. Design Token Layer

CSS custom properties in `globals.css`:
- Colors: `--color-rausch` (#FF385C), `--color-hof` (#222), `--color-foggy` (#717171), `--color-border` (#DDD)
- Typography: `--font-size-xs` through `--font-size-3xl`
- Spacing: `--space-1` through `--space-16`
- Radii: `--radius-sm` through `--radius-full`
- Shadows: `--shadow-card`, `--shadow-hover`, `--shadow-dropdown`, `--shadow-header`
- Motion: `--duration-fast/normal/slow`, `--easing-standard/decelerate`

Tailwind extended with Airbnb-specific values.

---

## 6. Verification Checklist

### Visual Fidelity
- [ ] Header: 80px height, correct pill search, sticky behavior, nav links on scroll
- [ ] Title: 26px semibold, Share/Save controls
- [ ] Hero: 480px height, 1+4 grid, 8px gap, 12px radius, Show all photos btn
- [ ] Two-column layout: flex-1 + 380px sticky card
- [ ] Reservation card: gradient button, breakdown, discount badge
- [ ] Typography: Airbnb Cereal font loaded, correct sizes/weights
- [ ] Dividers: 1px #DDDDDD
- [ ] Photo Tour: full-screen, category chips, grouped gallery
- [ ] Lightbox: contain image, arrows disabled at boundaries, counter

### Accessibility
- [ ] Semantic landmarks: `<header>`, `<main>`, `<aside>`, `<footer>`, `<nav>`
- [ ] Headings in correct order (h1 → h2 → h3)
- [ ] All icon buttons have `aria-label`
- [ ] All images have descriptive `alt` text
- [ ] Focus trap in overlays (Tab + Shift+Tab cycling)
- [ ] Escape closes overlays
- [ ] Focus restored to opener on close
- [ ] `prefers-reduced-motion` respected via CSS
- [ ] Color not sole indicator (disabled: opacity + `aria-disabled`)
- [ ] Keyboard nav: all interactive elements reachable with Tab

### Behavioral
- [ ] Save toggles heart without navigation
- [ ] Share uses Web Share API → clipboard fallback
- [ ] Show more/less collapses correctly
- [ ] Calendar month navigation works locally
- [ ] Reserve button provides visible feedback
- [ ] Lightbox keyboard navigation (← → Escape)
- [ ] Photo Tour → Lightbox → back to Photo Tour flow
- [ ] Anchor nav scrolls to sections
- [ ] Body scroll locked while overlay open

### Technical
- [ ] TypeScript: zero errors (`tsc --noEmit`)
- [ ] ESLint: zero errors (`next lint`)
- [ ] Tests pass (`jest --passWithNoTests`)
- [ ] Build succeeds (`next build`)
- [ ] 1280px and 1440px desktop widths work correctly
- [ ] No console errors in dev server

---

## 7. Files Inspected / Commands Run

- `ls /home/nitin/Documents/Intern/playpower/` — empty directory
- `find /home/nitin/Downloads/assets -type f` — 90 files discovered
- `node --version` — v26.12.0
- `npm --version` — 12.2.1
- `npm install` — all dependencies installed
- Reference: https://airbnb-clone-umber-two.vercel.app (observed visually)

## 8. Blockers / Notes

- No blockers. Project was an empty directory — fresh Next.js implementation.
- The duplicate underscore/hyphen images in assets are the same files; using hyphen versions in code.
- The `create-next-app` scaffolding timed out; project was set up manually.
- `unrs-resolver` and `sharp` install scripts were blocked by npm policy — not required for dev.
