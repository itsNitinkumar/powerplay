# Production-Scale Vacation Rental Marketplace Architecture

## Overview

This document describes a production-scale architecture for a vacation rental marketplace (Airbnb-scale), capable of handling millions of listings, concurrent users, real-time bookings, and global distribution.

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENTS                                            │
│         Browser (Next.js SSR/SSG)  ·  iOS App  ·  Android App              │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼───────────────────────────────────────────────────┐
│                    GLOBAL CDN / EDGE LAYER                                   │
│   Cloudflare (DNS + WAF + DDoS) → Vercel/Fastly Edge Network               │
│   - Static assets (JS/CSS/images) from edge POPs                           │
│   - Image CDN (Cloudinary / Imgix) with auto-resize, WebP/AVIF             │
│   - Edge caching of SSR page shells (stale-while-revalidate)               │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────────────────┐
│                      API GATEWAY (Kong / AWS API GW)                         │
│   - Rate limiting & throttling                                               │
│   - JWT / OAuth 2.0 authentication                                          │
│   - Request routing to microservices                                        │
│   - SSL termination, request logging                                        │
└────────┬─────────────┬──────────────┬──────────────┬───────────────────────┘
         │             │              │              │
┌────────▼──┐  ┌───────▼──┐  ┌───────▼──┐  ┌───────▼──────────┐
│ LISTING   │  │ BOOKING   │  │ PAYMENTS │  │ USER / AUTH      │
│ SERVICE   │  │ SERVICE   │  │ SERVICE  │  │ SERVICE          │
│ (Go/Node) │  │ (Java)    │  │ (Node)   │  │ (Node/Go)        │
│           │  │           │  │          │  │                  │
│ CRUD for  │  │ Reserve,  │  │ Stripe / │  │ OAuth, JWT,      │
│ listings, │  │ calendar, │  │ Razorpay │  │ sessions,        │
│ photos,   │  │ holds,    │  │ payouts  │  │ profile,         │
│ amenities │  │ conflicts │  │ refunds  │  │ verification     │
└────────┬──┘  └───────┬──┘  └────┬─────┘  └─────────┬────────┘
         │             │           │                   │
┌────────▼─────────────▼───────────▼───────────────────▼────────┐
│                   MESSAGE BUS / EVENT QUEUE                     │
│          Apache Kafka  (topics: bookings, payments, reviews)   │
│   - Async processing: emails, notifications, analytics events  │
│   - Saga pattern for distributed transactions                  │
└────────────────────────────┬───────────────────────────────────┘
                             │
         ┌───────────────────┼─────────────────────┐
         │                   │                     │
┌────────▼──────┐  ┌─────────▼────────┐  ┌────────▼──────────┐
│ SEARCH SERVICE │  │ REVIEW SERVICE   │  │ NOTIFICATION SVC  │
│ (Elasticsearch)│  │ (Node/Python)    │  │ (Node)            │
│                │  │                  │  │                   │
│ Full-text,    │  │ CRUD reviews,    │  │ Email (SendGrid)  │
│ geo search,   │  │ sentiment,       │  │ SMS (Twilio)      │
│ filters,      │  │ aggregation      │  │ Push (FCM/APNs)   │
│ facets        │  │                  │  │                   │
└───────────────┘  └──────────────────┘  └───────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         DATA STORES                              │
│                                                                 │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  PostgreSQL     │  │  Redis Cluster  │  │  Object Storage │ │
│  │  (Primary DB)   │  │  (Cache / Rate  │  │  (AWS S3 /      │ │
│  │  - Listings     │  │   Limiting /    │  │   Cloudflare R2)│ │
│  │  - Bookings     │  │   Sessions)     │  │  - Photos       │ │
│  │  - Users        │  │                 │  │  - Documents    │ │
│  │  - Reviews      │  │  TTL-based      │  │  - Contracts    │ │
│  │  Read replicas  │  │  listing cache  │  │                 │ │
│  │  PgBouncer pool │  │                 │  │  CloudFront CDN │ │
│  └────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       OBSERVABILITY                              │
│                                                                 │
│  Metrics: Prometheus + Grafana                                  │
│  Tracing: OpenTelemetry → Jaeger / Datadog                      │
│  Logging: Structured JSON → ELK Stack / Loki                   │
│  Alerting: PagerDuty / OpsGenie                                 │
│  Uptime: Pingdom / Checkly synthetic monitoring                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT STRATEGY                           │
│                                                                 │
│  Container Platform: Kubernetes (EKS / GKE)                    │
│  CI/CD: GitHub Actions → Docker Build → ECR → Argo CD          │
│  Blue/Green deployments with automatic rollback                 │
│  Feature flags: LaunchDarkly                                    │
│  Infrastructure as Code: Terraform + Helm charts               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Deep Dives

### 1. Frontend (Next.js on Vercel)

| Concern | Solution |
|---------|----------|
| Rendering | SSR for listing pages (SEO), SSG for static pages, CSR for overlays |
| Performance | Image optimization, code splitting, prefetching |
| SEO | `next/head` meta, Open Graph, JSON-LD structured data |
| State | React Context + Zustand for complex client state |
| Auth | NextAuth.js with JWT sessions |

### 2. API Gateway

- **Kong** or **AWS API Gateway** as the single entry point
- JWT validation at gateway level (delegated to Auth Service)
- Rate limiting: 100 req/min for anonymous, 1000 req/min for authenticated
- Supports GraphQL federation for complex queries spanning services

### 3. Listing Service

- **CRUD** for listing creation, editing, photo uploads
- Photo upload flow: Client → Presigned S3 URL → S3 → Lambda trigger → Image CDN
- Listing data cached in Redis with 5-minute TTL
- PostgreSQL with read replicas for high-read traffic

### 4. Booking Service

- **Distributed locking** (Redis SETNX) to prevent double bookings
- Calendar hold pattern: temporary 15-minute locks during checkout
- **Saga pattern** for booking + payment + notification as atomic unit
- Conflict resolution via optimistic locking on availability tables

### 5. Payments Service

- Stripe Connect for host payouts (marketplace payments)
- India-specific: Razorpay for UPI, cards, net banking
- PCI-DSS compliant (no card data stored locally)
- Automatic refunds via webhook handlers

### 6. Search Service (Elasticsearch)

- Index contains denormalized listing documents
- Geo-point fields for radius search, bounding box queries
- Filters: price range, amenities (term aggregations), bedrooms, dates
- Full-text: listing title, description with multilingual analyzers
- Sync: PostgreSQL → Debezium CDC → Kafka → Elasticsearch consumer

### 7. PostgreSQL Schema (Core Tables)

```sql
listings (id, host_id, title, location, lat, lng, price_per_night, ...)
listing_photos (id, listing_id, url, category, display_order)
amenities (id, listing_id, name, icon, available)
bookings (id, listing_id, guest_id, check_in, check_out, status, total_price)
reviews (id, booking_id, author_id, listing_id, rating, text, created_at)
users (id, email, name, avatar_url, joined_at, is_superhost)
availability (listing_id, date, is_blocked, minimum_nights)
```

### 8. Image CDN Strategy

- All uploads go to S3 `raw/` prefix
- Lambda trigger runs image validation and creates variants: 
  `thumbnail (200px)`, `card (600px)`, `hero (1200px)`, `full (2400px)`
- Variants stored with cache headers: `Cache-Control: public, max-age=31536000, immutable`
- Served via CloudFront with WebP/AVIF negotiation

### 9. Caching Strategy

| Layer | Tool | TTL |
|-------|------|-----|
| CDN (HTML shells) | Cloudflare | 60s + stale-while-revalidate |
| Listing detail | Redis | 5 minutes |
| Search results | Redis | 2 minutes |
| Static assets | CDN | 1 year (immutable) |
| Session data | Redis | 24 hours |

### 10. Scaling Strategy

| Service | Scaling approach |
|---------|-----------------|
| Frontend | Vercel edge globally auto-scales |
| API Gateway | Kong Kubernetes + HPA |
| Listing/Booking | Kubernetes Deployments, HPA on CPU/memory |
| PostgreSQL | Multi-AZ RDS, read replicas, PgBouncer pooling |
| Elasticsearch | 3-node cluster, dedicated master + data nodes |
| Redis | Redis Cluster (6 nodes, 3 shards, 1 replica each) |
| Kafka | 3-broker cluster, replication factor 3 |
| Object Storage | S3 (globally redundant by default) |

### 11. Security

- All internal service communication over mTLS (Istio service mesh)
- Secrets management via AWS Secrets Manager / Vault
- SQL injection prevention: parameterized queries, TypeORM
- XSS: CSP headers, input sanitization
- Rate limiting + CAPTCHA on auth endpoints
- GDPR: right-to-erasure pipeline via deletion queue

---

## Deployment Topology

```
Region: ap-south-1 (Mumbai — primary)
Region: us-east-1 (Virginia — secondary/DR)

Per region:
  - 3 AZs
  - EKS cluster with node groups (general, memory-optimized for Redis/ES)
  - RDS Multi-AZ PostgreSQL (primary) + 2 read replicas
  - Elasticache Redis Cluster
  - MSK (Managed Kafka)

Global:
  - Cloudflare (DNS, WAF, CDN)
  - Vercel (Next.js SSR edge)
  - S3 + CloudFront (assets + photos)
  - Route53 health-check-based failover to secondary region
```

---

## Disaster Recovery

| Metric | Target |
|--------|--------|
| RTO (Recovery Time Objective) | < 15 minutes |
| RPO (Recovery Point Objective) | < 5 minutes |
| Availability SLA | 99.95% |
| PostgreSQL PITR backups | Every 5 minutes |
| Kafka replication | Synchronous, RF=3 |
