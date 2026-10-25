/**
 * Tests for listing data model
 */
import { listing } from '@/data/listing';

describe('Listing data model', () => {
  it('has the correct title', () => {
    expect(listing.title).toBe('Romantic Jacuzzi 1BHK Candolim | Mirashya UG10');
  });

  it('has exactly 43 gallery photos', () => {
    expect(listing.gallery).toHaveLength(43);
  });

  it('has exactly 5 hero image ids', () => {
    expect(listing.heroImages).toHaveLength(5);
  });

  it('all hero images reference existing gallery photos', () => {
    const galleryIds = new Set(listing.gallery.map(p => p.id));
    for (const id of listing.heroImages) {
      expect(galleryIds.has(id)).toBe(true);
    }
  });

  it('has valid rating (between 1 and 5)', () => {
    expect(listing.rating).toBeGreaterThanOrEqual(1);
    expect(listing.rating).toBeLessThanOrEqual(5);
  });

  it('has at least 5 reviews', () => {
    expect(listing.reviews.length).toBeGreaterThanOrEqual(5);
  });

  it('has amenities totalling 50', () => {
    expect(listing.amenities).toHaveLength(50);
  });

  it('has at least 3 house rules', () => {
    expect(listing.houseRules.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 3 nearby stays', () => {
    expect(listing.nearbyStays.length).toBeGreaterThanOrEqual(3);
  });

  it('has host info', () => {
    expect(listing.host.name).toBeTruthy();
    expect(listing.host.avatar).toBeTruthy();
  });

  it('all gallery photos have required fields', () => {
    for (const photo of listing.gallery) {
      expect(photo.id).toBeTruthy();
      expect(photo.src).toBeTruthy();
      expect(photo.alt).toBeTruthy();
      expect(photo.category).toBeTruthy();
    }
  });
});
