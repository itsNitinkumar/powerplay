import type { ListingData } from '@/types';

export const listing: ListingData = {
  id: 'romantic-jacuzzi-1bhk-candolim',
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  location: 'Candolim, Goa, India',
  locationDetail: 'Candolim, North Goa, Goa, India',
  rating: 4.87,
  reviewCount: 19,
  isSuperhost: false,
  isGuestFavorite: true,
  type: 'Entire apartment',
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  pricePerNight: 15876,
  originalPrice: 21168,
  checkIn: 'Oct 10',
  checkOut: 'Oct 15',
  totalPrice: 79380,
  sleepDescription: 'Bedroom · 1 queen bed',
  mapCenter: { lat: 15.5184, lng: 73.7627 },
  locationDescription:
    'The listing is ideally located in the heart of Candolim, just minutes from the famous Candolim Beach, Sinquerim Beach, and a short drive to popular spots like Baga and Calangute. You\'re surrounded by great restaurants, beach shacks, and local markets—perfect for exploring North Goa at your own pace.',

  description: `Welcome to Mirashya — your luxurious private escape in the heart of Candolim, Goa.

Step into a world of romance and relaxation with our beautifully designed 1BHK apartment, thoughtfully curated for couples seeking an intimate retreat. The centrepiece of this sanctuary is the stunning private Jacuzzi, perfect for unwinding after a day of exploring Goa's sun-kissed beaches and vibrant nightlife.

The apartment features a fully equipped modern kitchen, a cozy queen-sized bed with premium linen, and a stylishly decorated living space. Floor-to-ceiling windows flood the room with natural light and offer serene views of the lush surroundings.

Our building offers exclusive access to a sparkling swimming pool, a well-equipped gym, and 24/7 security — ensuring a safe, comfortable, and indulgent stay.

Located just minutes from Candolim Beach, Sinquerim Beach, and a short drive to Baga and Calangute, you're in the perfect base for exploring North Goa.`,

  descriptionShort: `Welcome to Mirashya — your luxurious private escape in the heart of Candolim, Goa.

Step into a world of romance and relaxation with our beautifully designed 1BHK apartment, thoughtfully curated for couples seeking an intimate retreat. The centrepiece of this sanctuary is the stunning private Jacuzzi, perfect for unwinding after a day of exploring Goa's sun-kissed beaches.`,

  highlights: [
    {
      icon: 'star',
      title: 'Guest favourite',
      description: 'One of the highest-rated homes on Airbnb based on ratings, reviews, and reliability',
    },
    {
      icon: 'door',
      title: 'Self check-in',
      description: 'Check yourself in with the smartlock',
    },
    {
      icon: 'location',
      title: 'Great location',
      description: '95% of recent guests gave the location a 5-star rating.',
    },
  ],

  gallery: [
    // Living Room (8 photos)
    { id: '1', src: '/images/5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg', alt: 'Jacuzzi tub with blue lighting in the bathroom', category: 'Jacuzzi / Bathroom', categoryOrder: 1 },
    { id: '2', src: '/images/48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg', alt: 'Living room with sofa and modern decor', category: 'Living room', categoryOrder: 2 },
    { id: '3', src: '/images/a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg', alt: 'Cozy living room area', category: 'Living room', categoryOrder: 2 },
    { id: '4', src: '/images/70325367-cbae-4993-b560-18cd3f6edd53.jpeg', alt: 'Living room with decorative lighting', category: 'Living room', categoryOrder: 2 },
    { id: '5', src: '/images/9be71047-fc52-438a-9270-75cb470f6752.jpeg', alt: 'Open plan living area', category: 'Living room', categoryOrder: 2 },
    { id: '6', src: '/images/5b856fde-a393-41bf-b373-c9d02e64221f.jpeg', alt: 'Kitchen area visible from living room', category: 'Full kitchen', categoryOrder: 3 },
    { id: '7', src: '/images/b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg', alt: 'Modern kitchen with appliances', category: 'Full kitchen', categoryOrder: 3 },
    { id: '8', src: '/images/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg', alt: 'Kitchen counter and cabinets', category: 'Full kitchen', categoryOrder: 3 },
    { id: '9', src: '/images/23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg', alt: 'Bedroom with queen bed and soft lighting', category: 'Bedroom', categoryOrder: 4 },
    { id: '10', src: '/images/9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg', alt: 'Bedroom with luxury bedding', category: 'Bedroom', categoryOrder: 4 },
    { id: '11', src: '/images/dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg', alt: 'Bedroom wardrobe and storage', category: 'Bedroom', categoryOrder: 4 },
    { id: '12', src: '/images/0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg', alt: 'Modern bathroom with shower', category: 'Jacuzzi / Bathroom', categoryOrder: 1 },
    { id: '13', src: '/images/f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg', alt: 'Jacuzzi with mood lighting', category: 'Jacuzzi / Bathroom', categoryOrder: 1 },
    { id: '14', src: '/images/79addceb-8c2d-419b-80ff-e29af426a94c.jpeg', alt: 'Jacuzzi close-up view', category: 'Jacuzzi / Bathroom', categoryOrder: 1 },
    { id: '15', src: '/images/97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg', alt: 'Gym equipment and fitness area', category: 'Gym', categoryOrder: 5 },
    { id: '16', src: '/images/c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg', alt: 'Gym with treadmills and weights', category: 'Gym', categoryOrder: 5 },
    { id: '17', src: '/images/929545d3-e241-46c0-8a70-c24531ce7b54.jpeg', alt: 'Building exterior view', category: 'Exterior', categoryOrder: 6 },
    { id: '18', src: '/images/153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg', alt: 'Building entrance and lobby', category: 'Exterior', categoryOrder: 6 },
    { id: '19', src: '/images/1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg', alt: 'Swimming pool area', category: 'Pool', categoryOrder: 7 },
    { id: '20', src: '/images/608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg', alt: 'Pool deck with loungers', category: 'Pool', categoryOrder: 7 },
    { id: '21', src: '/images/862d936c-0f34-4e50-af87-b519e2781d19.jpeg', alt: 'Pool view from above', category: 'Pool', categoryOrder: 7 },
    { id: '22', src: '/images/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg', alt: 'Additional photo - living space', category: 'Additional photos', categoryOrder: 8 },
    { id: '23', src: '/images/34529829-a971-44d3-ac2f-90ea3678a34d.jpeg', alt: 'Additional photo - decor details', category: 'Additional photos', categoryOrder: 8 },
    { id: '24', src: '/images/3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg', alt: 'Additional photo - room overview', category: 'Additional photos', categoryOrder: 8 },
    { id: '25', src: '/images/3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg', alt: 'Additional photo - balcony view', category: 'Additional photos', categoryOrder: 8 },
    { id: '26', src: '/images/3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg', alt: 'Additional photo - interior', category: 'Additional photos', categoryOrder: 8 },
    { id: '27', src: '/images/42befad7-fb29-473d-91db-b03e7a544d1d.jpeg', alt: 'Additional photo - lighting setup', category: 'Additional photos', categoryOrder: 8 },
    { id: '28', src: '/images/4fede77d-7a71-446f-89e3-263af937f3fa.jpeg', alt: 'Additional photo - seating area', category: 'Additional photos', categoryOrder: 8 },
    { id: '29', src: '/images/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg', alt: 'Additional photo - table setting', category: 'Additional photos', categoryOrder: 8 },
    { id: '30', src: '/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg', alt: 'Additional photo - window view', category: 'Additional photos', categoryOrder: 8 },
    { id: '31', src: '/images/79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg', alt: 'Additional photo - night ambiance', category: 'Additional photos', categoryOrder: 8 },
    { id: '32', src: '/images/8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg', alt: 'Additional photo - apartment entrance', category: 'Additional photos', categoryOrder: 8 },
    { id: '33', src: '/images/a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg', alt: 'Additional photo - kitchen close-up', category: 'Additional photos', categoryOrder: 8 },
    { id: '34', src: '/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg', alt: 'Additional photo - bathroom details', category: 'Additional photos', categoryOrder: 8 },
    { id: '35', src: '/images/cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg', alt: 'Additional photo - bedroom lighting', category: 'Additional photos', categoryOrder: 8 },
    { id: '36', src: '/images/ddc853d7-e658-405c-bedc-8f31106c447e.jpeg', alt: 'Additional photo - relaxing area', category: 'Additional photos', categoryOrder: 8 },
    { id: '37', src: '/images/f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg', alt: 'Additional photo - living room side', category: 'Additional photos', categoryOrder: 8 },
    { id: '38', src: '/images/f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg', alt: 'Additional photo - hallway', category: 'Additional photos', categoryOrder: 8 },
    { id: '39', src: '/images/fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg', alt: 'Additional photo - balcony', category: 'Additional photos', categoryOrder: 8 },
    { id: '40', src: '/images/fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg', alt: 'Additional photo - bedroom window', category: 'Additional photos', categoryOrder: 8 },
    { id: '41', src: '/images/246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg', alt: 'Additional photo - pool at night', category: 'Additional photos', categoryOrder: 8 },
    { id: '42', src: '/images/30ad93b2-293f-494d-b645-626303c6cb93.jpeg', alt: 'Additional photo - common area', category: 'Additional photos', categoryOrder: 8 },
    { id: '43', src: '/images/9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg', alt: 'Additional photo - property grounds', category: 'Additional photos', categoryOrder: 8 },
  ],

  heroImages: ['1', '2', '3', '9', '19'],

  amenities: [
    // Standout amenities
    { id: 'a1', name: 'Hot tub', icon: 'hot-tub', category: 'Standout amenities', available: true, highlight: true },
    { id: 'a2', name: 'Pool', icon: 'waves', category: 'Standout amenities', available: true, highlight: true },
    { id: 'a3', name: 'Gym', icon: 'dumbbell', category: 'Standout amenities', available: true, highlight: true },
    // Bathroom
    { id: 'a4', name: 'Hair dryer', icon: 'wind', category: 'Bathroom', available: true },
    { id: 'a5', name: 'Cleaning products', icon: 'spray-can', category: 'Bathroom', available: true },
    { id: 'a6', name: 'Shampoo', icon: 'droplets', category: 'Bathroom', available: true },
    { id: 'a7', name: 'Conditioner', icon: 'droplets', category: 'Bathroom', available: true },
    { id: 'a8', name: 'Body soap', icon: 'droplets', category: 'Bathroom', available: true },
    { id: 'a9', name: 'Hot water', icon: 'flame', category: 'Bathroom', available: true },
    { id: 'a10', name: 'Shower gel', icon: 'droplet', category: 'Bathroom', available: true },
    // Bedroom
    { id: 'a11', name: 'Hangers', icon: 'shirt', category: 'Bedroom and laundry', available: true },
    { id: 'a12', name: 'Bed linens', icon: 'bed', category: 'Bedroom and laundry', available: true },
    { id: 'a13', name: 'Extra pillows and blankets', icon: 'bed', category: 'Bedroom and laundry', available: true },
    { id: 'a14', name: 'Iron', icon: 'zap', category: 'Bedroom and laundry', available: true },
    { id: 'a15', name: 'Clothing storage', icon: 'archive', category: 'Bedroom and laundry', available: true },
    // Entertainment
    { id: 'a16', name: 'TV', icon: 'tv', category: 'Entertainment', available: true },
    { id: 'a17', name: 'Netflix', icon: 'play', category: 'Entertainment', available: true },
    // Kitchen
    { id: 'a18', name: 'Kitchen', icon: 'utensils', category: 'Kitchen and dining', available: true },
    { id: 'a19', name: 'Refrigerator', icon: 'thermometer', category: 'Kitchen and dining', available: true },
    { id: 'a20', name: 'Microwave', icon: 'zap', category: 'Kitchen and dining', available: true },
    { id: 'a21', name: 'Coffee maker', icon: 'coffee', category: 'Kitchen and dining', available: true },
    { id: 'a22', name: 'Dishes and silverware', icon: 'utensils', category: 'Kitchen and dining', available: true },
    { id: 'a23', name: 'Cooking basics', icon: 'flame', category: 'Kitchen and dining', available: true },
    { id: 'a24', name: 'Dining table', icon: 'layout', category: 'Kitchen and dining', available: true },
    // Outdoor
    { id: 'a25', name: 'Private patio or balcony', icon: 'sun', category: 'Outdoor', available: true },
    { id: 'a26', name: 'Outdoor furniture', icon: 'armchair', category: 'Outdoor', available: true },
    // Services
    { id: 'a27', name: 'Long-term stays allowed', icon: 'calendar', category: 'Services', available: true },
    { id: 'a28', name: 'Luggage dropoff allowed', icon: 'luggage', category: 'Services', available: true },
    // Safety
    { id: 'a29', name: 'Smoke alarm', icon: 'alert-triangle', category: 'Home safety', available: true },
    { id: 'a30', name: 'Fire extinguisher', icon: 'flame', category: 'Home safety', available: true },
    { id: 'a31', name: 'Carbon monoxide alarm', icon: 'alert-circle', category: 'Home safety', available: true },
    { id: 'a32', name: 'First aid kit', icon: 'heart', category: 'Home safety', available: true },
    // Location / Internet
    { id: 'a33', name: 'Wifi', icon: 'wifi', category: 'Internet and office', available: true },
    { id: 'a34', name: 'Dedicated workspace', icon: 'monitor', category: 'Internet and office', available: true },
    // Parking
    { id: 'a35', name: 'Free parking on premises', icon: 'car', category: 'Parking and facilities', available: true },
    { id: 'a36', name: 'Elevator', icon: 'arrow-up', category: 'Parking and facilities', available: true },
    // Climate
    { id: 'a37', name: 'Air conditioning', icon: 'wind', category: 'Heating and cooling', available: true },
    { id: 'a38', name: 'Ceiling fan', icon: 'fan', category: 'Heating and cooling', available: true },
    // Not available
    { id: 'a39', name: 'Washer', icon: 'loader', category: 'Bedroom and laundry', available: false },
    { id: 'a40', name: 'Dryer', icon: 'loader', category: 'Bedroom and laundry', available: false },
    { id: 'a41', name: 'Breakfast', icon: 'coffee', category: 'Services', available: false },
    { id: 'a42', name: 'Pets allowed', icon: 'cat', category: 'Services', available: false },
    { id: 'a43', name: 'Smoking allowed', icon: 'cigarette-off', category: 'Services', available: false },
    { id: 'a44', name: 'Baby bath', icon: 'baby', category: 'Family', available: false },
    { id: 'a45', name: 'Baby monitor', icon: 'baby', category: 'Family', available: false },
    { id: 'a46', name: 'Crib', icon: 'baby', category: 'Family', available: false },
    { id: 'a47', name: 'High chair', icon: 'baby', category: 'Family', available: false },
    { id: 'a48', name: 'Children\'s books and toys', icon: 'book-open', category: 'Family', available: false },
    { id: 'a49', name: 'Dishwasher', icon: 'utensils', category: 'Kitchen and dining', available: false },
    { id: 'a50', name: 'Indoor fireplace', icon: 'flame', category: 'Heating and cooling', available: false },
  ],

  reviews: [
    {
      id: 'r1',
      authorName: 'Anjali',
      authorAvatar: '/images/avatars/rev1.jpeg',
      location: 'Mumbai, India',
      date: 'September 2025',
      rating: 5,
      text: 'What an absolutely stunning apartment! The jacuzzi was the highlight of our stay — we spent hours in it every evening. The space is beautifully designed with great attention to detail. The location is perfect for exploring North Goa. Will definitely be back!',
      years: 3,
    },
    {
      id: 'r2',
      authorName: 'Rahul',
      authorAvatar: '/images/avatars/rev2.jpeg',
      location: 'Bangalore, India',
      date: 'August 2025',
      rating: 5,
      text: 'Incredible experience! The apartment is exactly as shown in the photos — if not better. The jacuzzi and pool made it a complete package. Host was very responsive and check-in was seamless with the smartlock. Highly recommend for couples!',
      years: 2,
    },
    {
      id: 'r3',
      authorName: 'Priya',
      authorAvatar: '/images/avatars/rev3.jpeg',
      location: 'Delhi, India',
      date: 'July 2025',
      rating: 5,
      text: 'We had a magical stay at this property. The jacuzzi is absolutely top-notch and the apartment has such a romantic vibe. The kitchen was well-stocked and the TV with Netflix made evenings extra cozy. The pool is beautiful and well-maintained. Candolim beach is just a 5-minute walk. Loved every bit of our stay and we are already planning to come back!',
      years: 4,
    },
    {
      id: 'r4',
      authorName: 'Kiran',
      authorAvatar: '/images/avatars/rev4.jpeg',
      location: 'Hyderabad, India',
      date: 'June 2025',
      rating: 5,
      text: 'Perfect getaway apartment! The jacuzzi was a dream. Everything was spotlessly clean and the amenities were top-tier. Would highly recommend to anyone visiting Goa.',
      years: 1,
    },
    {
      id: 'r5',
      authorName: 'Meera',
      authorAvatar: '/images/avatars/rev5.jpeg',
      location: 'Pune, India',
      date: 'May 2025',
      rating: 4,
      text: 'Loved the place! The jacuzzi is the main attraction and it did not disappoint. Great ambiance for a couple\'s retreat. The gym facilities are a bonus. Only minor feedback — the WiFi could be faster. But overall an amazing stay in a beautiful apartment.',
      years: 2,
    },
  ],

  ratingBreakdown: [
    { category: 'Cleanliness', score: 4.9, icon: 'sparkles' },
    { category: 'Accuracy', score: 4.8, icon: 'check-circle' },
    { category: 'Check-in', score: 4.9, icon: 'door-open' },
    { category: 'Communication', score: 4.9, icon: 'message-circle' },
    { category: 'Location', score: 4.8, icon: 'map-pin' },
    { category: 'Value', score: 4.7, icon: 'tag' },
  ],

  host: {
    name: 'Mirashya',
    avatar: '/images/avatars/host.jpeg',
    joinedYear: 2022,
    reviewCount: 19,
    rating: 4.87,
    isSuperhost: false,
    responseRate: 100,
    responseTime: 'within an hour',
    about:
      'Welcome to Mirashya! We are passionate about creating luxurious, memorable experiences for our guests. Our apartment is designed with romance and comfort in mind — every detail has been carefully curated. We love hosting couples and making their Goa vacation special. We\'re always available to help with recommendations and any requests during your stay.',
  },

  coHosts: [
    { name: 'Priya', avatar: '/images/avatars/co1.jpg' },
    { name: 'Arjun', avatar: '/images/avatars/co2.jpg' },
    { name: 'Kavya', avatar: '/images/avatars/co3.jpg' },
  ],

  houseRules: [
    { icon: 'clock', text: 'Check-in: 2:00 PM – 12:00 AM' },
    { icon: 'clock', text: 'Checkout before 11:00 AM' },
    { icon: 'users', text: '2 guests maximum' },
    { icon: 'cigarette-off', text: 'No smoking' },
    { icon: 'paw-print', text: 'No pets' },
    { icon: 'party-popper', text: 'No parties or events' },
    { icon: 'moon', text: 'Quiet hours: 11:00 PM – 8:00 AM' },
    { icon: 'camera', text: 'Exterior camera/recording device on property' },
  ],

  safetyItems: [
    'Carbon monoxide alarm',
    'Smoke alarm',
    'Security camera/recording device',
    'Pool/hot tub without gate or lock',
    'Nearby lake, river, other body of water',
  ],

  cancellationPolicy: `Free cancellation before Oct 3. Cancel before check-in on Oct 10 for a partial refund. The first night and service fee are non-refundable.

If you cancel before Oct 10, you'll get a full refund minus the first night and the service fee.`,

  nearbyStays: [
    {
      id: 'ns1',
      title: 'Luxury Beach Villa',
      image: '/images/similar/s1.jpeg',
      location: 'Baga, Goa',
      rating: 4.92,
      reviewCount: 47,
      pricePerNight: 18500,
      nights: 5,
      dates: 'Oct 10 – 15',
    },
    {
      id: 'ns2',
      title: 'Modern Studio near Beach',
      image: '/images/similar/s2.jpeg',
      location: 'Calangute, Goa',
      rating: 4.85,
      reviewCount: 32,
      pricePerNight: 8200,
      nights: 5,
      dates: 'Oct 10 – 15',
    },
    {
      id: 'ns3',
      title: 'Cosy 2BHK Apartment',
      image: '/images/similar/s3.jpeg',
      location: 'Candolim, Goa',
      rating: 4.78,
      reviewCount: 28,
      pricePerNight: 12000,
      nights: 5,
      dates: 'Oct 10 – 15',
    },
    {
      id: 'ns4',
      title: 'Sea View Penthouse',
      image: '/images/similar/s4.jpeg',
      location: 'Sinquerim, Goa',
      rating: 4.95,
      reviewCount: 61,
      pricePerNight: 24000,
      nights: 5,
      dates: 'Oct 10 – 15',
    },
    {
      id: 'ns5',
      title: 'Portuguese Heritage Home',
      image: '/images/similar/s5.jpeg',
      location: 'Panaji, Goa',
      rating: 4.88,
      reviewCount: 39,
      pricePerNight: 9800,
      nights: 5,
      dates: 'Oct 10 – 15',
    },
    {
      id: 'ns6',
      title: 'Private Pool Villa',
      image: '/images/similar/s6.jpeg',
      location: 'Anjuna, Goa',
      rating: 4.96,
      reviewCount: 83,
      pricePerNight: 35000,
      nights: 5,
      dates: 'Oct 10 – 15',
    },
  ],
};
