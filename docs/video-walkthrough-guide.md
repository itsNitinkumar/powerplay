# Video Walkthrough Script & Recording Guide

This guide provides a structured, minute-by-minute script and screen action checklist for recording your 2–3 minute submission demo video for the **Playpower Labs Airbnb-Clone Take-Home Task**.

---

## 🎬 Video Overview & Timing

| Segment | Time | Screen Action | Key Talking Points |
|---|---|---|---|
| **1. Intro & Stack Overview** | 0:00 – 0:30 | Browser showing live deployed URL | Brief intro, stack (Next.js 15, React 19, TypeScript, Tailwind), AI-assisted development workflow |
| **2. Listing Page Fidelity** | 0:30 – 1:00 | Scroll down the listing page | Header sticky behavior, hero 5-image grid, ratings badge, expandable description, amenities, calendar, reviews breakdown |
| **3. Photo Tour Overlay** | 1:00 – 1:30 | Click "Show all photos" or hero photo | Full-screen photo tour, category tabs & sections, smooth scroll sync, keyboard Escape to close |
| **4. Lightbox Overlay** | 1:30 – 1:55 | Click any photo in the tour | Single-photo view, photo counter, left/right keyboard navigation, smooth image transitions, focus trapping |
| **5. Production Architecture** | 1:55 – 2:30 | Switch tab to Excalidraw diagram | 7-tier scale architecture: Next.js edge caching, API gateway, microservices, Kafka event bus, PostgreSQL + Redis distributed locking, Kubernetes deployment |
| **6. Conclusion** | 2:30 – 2:45 | Back to live page or slide | Summary, zero layout shifts, 100% accessible keyboard navigation, ready for production |

---

## 🎙️ Word-for-Word Video Script

### 1. Introduction (0:00 - 0:30)
> *"Hello! Today I’m presenting my take-home assignment for Playpower Labs: a pixel-perfect, production-grade clone of the Airbnb listing page at Amor De Goa by Mirashya Homes.*
>
> *I built this application using an AI-native development workflow leveraging modern coding agents, structured sub-agents, and automated validation loops. The frontend is built with Next.js 15, React 19, TypeScript, and Tailwind CSS, fully deployed and running live on Vercel."*

### 2. Listing Page Visual & Behavioral Parity (0:30 - 1:00)
> *(Action: Scroll smoothly down the page, hover over interactive elements)*
>
> *"Let's look at the main Listing Page. Notice the fixed header with custom Airbnb brand typography and the centered search bar. As I scroll down, notice the sub-navigation bar that seamlessly transitions in, indicating the active section.*
>
> *Here is the 5-image hero gallery, styled with identical border radii, hover states, and aspect ratios. Below that, we have the property summary, the laurel-framed Guest Favourite badge, and the expandable description.*
>
> *Further down, we have the amenities preview, the interactive booking calendar, the review category breakdown with star rating metrics, the host profile, and similar stays nearby."*

### 3. Overlay 1: Photo Tour Modal (1:00 - 1:30)
> *(Action: Click the 'Show all photos' button)*
>
> *"Now let's examine the first overlay: the Photo Tour modal. When clicked, the background is locked without layout shifting. The gallery displays all 43 high-resolution listing photos organized by room categories: Living Room, Kitchen, Bedroom, Bathroom, Gym, Exterior, and Pool.*
>
> *Every photo block matches the exact 1-landscape or 2-landscape grid layouts. Focus management is active, and pressing 'Escape' smoothly returns focus to the trigger button."*

### 4. Overlay 2: Lightbox Modal (1:30 - 1:55)
> *(Action: Re-open the tour, click an image to open the Lightbox, use Left/Right arrow keys)*
>
> *"Clicking any photo opens our second overlay: the Lightbox single-photo viewer. Notice the photo title, counter indicator (e.g., '14 of 43'), and navigation arrows.*
>
> *We have full keyboard parity: pressing the Right arrow navigates to the next photo with an animated fade, Left arrow goes backwards, and the back button returns to the Photo Tour at the exact room position. Focus is trapped within the dialog for WCAG accessibility compliance."*

### 5. High-Level Production Architecture (1:55 - 2:30)
> *(Action: Switch tab to Excalidraw showing `docs/architecture.excalidraw`)*
>
> *"Alongside the application, I designed a high-level system architecture for an Airbnb-scale marketplace capable of handling 10+ million listings and peak global booking concurrency.*
>
> *The architecture spans seven layers:*
> * *At the edge, Cloudflare and Vercel handle DDoS protection, WAF, and static asset caching with dynamic image optimization.*
> * *A Kong API Gateway terminates TLS and enforces token-bucket rate limiting.*
> * *The core domain is decomposed into microservices: Listing, Search, Payments, and Booking.*
> * *For bookings, we use a distributed Redlock on Redis to eliminate double-booking race conditions, coordinated via a Saga pattern over Apache Kafka.*
> * *Data persistence separates transactional ACID data in PostgreSQL with read replicas from faceted search in Elasticsearch and assets in AWS S3.*
> * *Finally, everything runs on Kubernetes with GitOps via ArgoCD and full observability using Prometheus, Grafana, and OpenTelemetry."*

### 6. Wrap Up (2:30 - 2:45)
> *"The complete repository includes clean type definitions, zero ESLint warnings, all design tokens, and the AI prompt sequence log in the docs directory. Thank you for your time and consideration!"*

---

## 🛠️ Recording Tips & Setup

1. **Recommended Recording Tools:**
   - [Loom](https://www.loom.com/) (quickest, cloud-hosted link)
   - [OBS Studio](https://obsproject.com/) (high quality 1080p 60fps)
   - Chrome extension / QuickTime player
2. **Display Settings:**
   - Record at **1920x1080 (1080p)** desktop resolution.
   - Zoom level at 100% in Chrome / Firefox.
3. **Tabs to Have Open:**
   - **Tab 1:** Your live deployed Vercel URL
   - **Tab 2:** [excalidraw.com](https://excalidraw.com) with `docs/architecture.excalidraw` loaded
   - **Tab 3:** (Optional) GitHub repository or VS Code showing the project structure
