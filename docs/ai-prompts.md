# AI Prompts & Workflow Log — Playpower Airbnb Clone

This document captures the sequential AI prompts and workflow methodology used during the development of the Playpower Labs Airbnb Clone take-home assignment.

---

## Prompt Sequence

### Prompt 1 — Inspect the project and create the implementation plan
```text
You are working on the Playpower Labs Airbnb-clone take-home assignment.

First inspect the entire current repository before changing anything:
1. Identify the framework, package manager, entry points, scripts, source directories, public/static assets, and existing tests.
2. Read the current README and configuration files.
3. Find the main application/page component and determine the existing styling approach.
4. Check whether there are uncommitted changes and preserve unrelated work.
5. Run the existing development/build/typecheck/test commands if they are available.

The visual reference is:
https://airbnb-clone-umber-two.vercel.app

Inspect the reference in a browser at desktop width. Record only observations, not source code. Document:
- Header structure, dimensions, spacing, typography, colors, borders, shadows, and sticky behavior.
- Listing title row and share/save controls.
- Five-image hero gallery layout and image aspect ratios.
- Main listing content, amenities, dates/calendar, reviews, location, host, policies, and nearby stays.
- Photo Tour overlay opened from “Show all photos”.
- Lightbox opened from a photo, including arrows, counter, close control, grid/back control, and keyboard behavior.
- Hover, focus, scroll, and transition behavior.

Create docs/implementation-plan.md containing:
- Current project findings.
- Proposed component tree.
- Proposed data model for listing/photos/reviews/amenities.
- Required application states and interactions.
- Verification checklist for visual fidelity and accessibility.

Do not implement the feature yet. Finish by reporting the exact files and commands you inspected and any blockers.
```

---

### Prompt 2 — Build the data and reusable UI foundation
```text
Using the findings in docs/implementation-plan.md, implement the foundation for the original Airbnb-style listing clone.

Requirements:
1. Keep the existing framework and package setup.
2. Create a typed/static local data model for:
   - listing title and location
   - guest/bedroom/bed/bathroom summary
   - price, dates, rating, review count
   - gallery photos with room/category labels
   - amenities
   - reviews
   - host information
   - house rules, cancellation, safety, and nearby stays
3. Use a single source of truth for this data; do not scatter strings throughout components.
4. Create reusable primitives for buttons, icon buttons, section headings, dividers, badges, avatar stacks, and modal shells.
5. Add a consistent design-token layer for font sizes, font weights, spacing, colors, radii, borders, shadows, and motion timing.
6. Use an icon library already present in the project; if none exists, use a small original inline SVG icon set. Do not copy icons or source code from the reference site.
7. Add accessible names and keyboard-focus styles to all interactive primitives.

Run formatting, typechecking, linting, and the fastest available test command. Fix all issues caused by this phase.
Do not build the full page yet; finish with the foundation compiling cleanly.
```

---

### Prompt 3 — Implement the desktop listing page
```text
Implement the complete desktop listing page using the local data and reusable foundation.

Match the reference visually through observation, not source-code copying. The page should include:
1. A fixed/sticky desktop header:
   - Airbnb-style red wordmark treatment created by us
   - centered rounded search control with “Anywhere”, “Anytime”, “Add guests”, and search icon
   - “Become a host”, language/globe control, and menu control
2. A centered max-width content container.
3. Listing title row with the exact reference title:
   “Romantic Jacuzzi 1BHK Candolim | Mirashya UG10”
   plus Share and Save controls.
4. The five-image hero grid:
   - one large image on the left
   - four smaller images in a 2x2 grid on the right
   - rounded outer corners and correct gaps
   - “Show all photos” button over the lower-right image
   - every image is keyboard-focusable and opens the correct overlay state
5. Main content below the gallery:
   - property summary
   - guest-favourite/rating card
   - host and feature highlights
   - translated description with “Show original” and expandable “Show more” behavior
   - where-you’ll-sleep section
   - amenities grid with “Show all 50 amenities” modal or expandable view
   - date-selection/calendar area showing October and November 2026
   - guest-favourite/review summary and rating breakdown
   - review list with expandable long reviews and “Show all 19 reviews”
   - map/location placeholder section with the correct text and controls
   - host profile and co-hosts
   - cancellation policy, house rules, and safety/property sections
   - nearby stays carousel/list with previous/next controls
6. A desktop reservation card in the right column with price, date/guest controls, and Reserve button. It should become sticky at the appropriate scroll position, matching the reference behavior.
7. Preserve the reference's generous whitespace, thin separators, muted text, rounded controls, and restrained shadows.

Important behavior:
- Header/nav links scroll to Photos, Amenities, Reviews, and Location.
- Share uses the Web Share API when available and otherwise provides a safe copy/share fallback.
- Save toggles a selected state without navigating away.
- “Show more” controls expand/collapse content with an accessible state.
- Calendar month controls work locally and preserve the displayed selection.
- Reserve and Message host may be non-submitting demo actions, but must provide visible feedback.

Use CSS/layout rather than screenshot backgrounds. Keep all content real text in the DOM. Run the dev server and verify the page at 1280px and 1440px widths.
```

---

### Prompt 4 — Implement Photo Tour and Lightbox overlays
```text
Implement the two required overlay views as original components driven by the same local gallery data.

Photo Tour:
- Open it from “Show all photos”, any hero image, or a gallery image.
- Full-screen white overlay/page with a top bar.
- Back/close control on the left.
- Centered “Photo tour” heading.
- Share and favorite controls on the right.
- A horizontal row of room/category thumbnails near the top.
- Scrollable gallery sections below, each with a room/category title, short metadata line, and large image.
- The gallery contains 43 photos in the data model, grouped into categories.
- Clicking a large photo opens the Lightbox at that image.
- Preserve scroll position when practical and provide a clear focus target when opening.

Lightbox:
- Full-screen white viewer.
- Grid/back control at top-left.
- Current image title centered at the top.
- “1 of 43” style counter at top-right beside a close button.
- Large centered image with object-fit: contain and no cropping.
- Previous and next circular arrow controls at the left and right edges.
- Previous is disabled on the first image and next is disabled on the last image.
- Left/right arrow keys navigate.
- Escape closes the lightbox and returns to the previous overlay/page.
- Tab navigation is trapped inside the active overlay; focus returns to the opener on close.
- Add a short, subtle opacity/scale transition without making navigation feel slow.

Use React state/router state already supported by the project if available. Do not duplicate gallery data between views. Add tests for opening, closing, previous/next, keyboard navigation, boundary disabling, and focus restoration.
```

---

### Prompt 5 — Visual fidelity and interaction polish pass
```text
Now run a visual and behavioral comparison pass against the reference at desktop widths 1280x800 and 1440x900.

Check the following systematically:
1. Header height, container width, alignment, search-pill dimensions, and sticky behavior.
2. Title baseline, font weights, line heights, and Share/Save spacing.
3. Hero gallery dimensions, crop positions, gaps, border radii, and overlay button placement.
4. Main two-column layout, reservation card width, and section vertical rhythm.
5. Typography hierarchy, colors, separators, borders, and shadows.
6. Review cards, rating bars, amenity icons, calendar spacing, and nearby-stay controls.
7. Overlay width/height, top controls, thumbnail sizes, image sizing, arrows, and transitions.
8. Hover states, focus rings, pressed/selected states, and disabled controls.
9. Scroll behavior and anchor navigation.

Fix the highest-impact differences first. Prefer CSS/layout corrections over hacks. Keep the implementation responsive enough that it does not break at 1024px.
```

---

### Prompt 6 — Accessibility, testing, and production cleanup
```text
Finish the assignment as a production-quality frontend deliverable.

Accessibility:
- Use semantic landmarks and headings in the correct order.
- Give every icon-only button an accessible name.
- Ensure all image buttons have useful alt text.
- Make all controls keyboard reachable.
- Provide visible focus styles.
- Implement modal focus trapping, Escape handling, and focus restoration.
- Prevent background scrolling while an overlay is open.
- Respect prefers-reduced-motion.
- Do not rely on color alone for selected, disabled, or error states.

Tests:
- Add or update tests for the listing page render.
- Test gallery opening from the hero and Show all photos.
- Test Photo Tour to Lightbox transition.
- Test Lightbox previous/next, arrow keys, Escape, first/last boundaries, and focus restoration.
- Test expandable description/amenities/reviews.
- Test Save state and non-destructive demo actions.

Project deliverables:
- Add a concise README with setup, scripts, architecture, and limitations.
- Add docs/architecture.md describing a production-scale marketplace architecture.
- Add an architecture diagram as docs/architecture.svg.
- Add docs/ai-prompts.md.
- Remove debug logs, dead code, unused dependencies, and placeholder TODOs.
```

---

### Prompt 7 — Final audit and handoff package
```text
Perform a final submission audit for the Playpower Labs assignment.

1. Start the app and manually exercise the user flow:
   - initial listing page
   - hero image click
   - Show all photos
   - Photo Tour category navigation/scrolling
   - Lightbox open, previous/next, keyboard arrows, Escape, close
   - expandable description, amenities, and reviews
   - anchor navigation and sticky reservation card
2. Run the project's lint, typecheck, tests, and production build.
3. Inspect the final git diff and confirm only intended project files are included.
4. Confirm there is no copied reference source code, browser bundle, secret, token, or private credential.
5. Confirm these files exist and are useful:
   - README.md
   - docs/implementation-plan.md
   - docs/architecture.md
   - docs/architecture.svg
   - docs/ai-prompts.md
   - docs/final-audit.md
```
