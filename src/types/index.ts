// ─── Core Types ───────────────────────────────────────────────────────────────

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: string;
  categoryOrder: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string; // lucide icon name or custom svg key
  category: string;
  available: boolean;
  highlight?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  years?: number; // years on airbnb
}

export interface RatingBreakdown {
  category: string;
  score: number; // 0-5
  icon: string;
}

export interface Host {
  name: string;
  avatar: string;
  joinedYear: number;
  reviewCount: number;
  rating: number;
  isSuperhost: boolean;
  responseRate: number;
  responseTime: string;
  about: string;
}

export interface CoHost {
  name: string;
  avatar: string;
}

export interface NearbyStay {
  id: string;
  title: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  nights?: number;
  dates?: string;
  isFavorite?: boolean;
}

export interface HouseRule {
  icon: string;
  text: string;
}

export interface ListingData {
  id: string;
  title: string;
  location: string;
  locationDetail: string;
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  pricePerNight: number;
  originalPrice?: number;
  description: string;
  descriptionShort: string;
  gallery: GalleryPhoto[];
  heroImages: string[]; // 5 ids for the hero grid
  amenities: Amenity[];
  reviews: Review[];
  ratingBreakdown: RatingBreakdown[];
  host: Host;
  coHosts: CoHost[];
  houseRules: HouseRule[];
  safetyItems: string[];
  cancellationPolicy: string;
  nearbyStays: NearbyStay[];
  checkIn: string; // 'Oct 10'
  checkOut: string; // 'Oct 15'
  totalPrice: number;
  sleepDescription: string;
  mapCenter: { lat: number; lng: number };
  locationDescription: string;
  highlights: Array<{ icon: string; title: string; description: string }>;
}

// ─── Overlay State ─────────────────────────────────────────────────────────────

export type OverlayState =
  | { type: 'none' }
  | { type: 'photo-tour'; startCategory?: string }
  | { type: 'lightbox'; photoIndex: number; fromTour?: boolean };
