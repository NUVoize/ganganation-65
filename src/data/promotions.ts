export interface PromotionalContent {
  id: string;
  type: 'image' | 'video';
  src: string;
  posterImage?: string; // For video thumbnails
  alt: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const promotionalBanners: PromotionalContent[] = [
  {
    id: 'promo-1',
    type: 'image',
    src: '/lovable-uploads/8dd50411-b22d-4d2b-8548-1d2edf6291a1.png',
    alt: 'Ganja Nation Premium Cannabis',
    title: 'Welcome to Ganja Nation',
    description: 'Premium Cannabis Experience',
    ctaText: 'Shop Now',
    ctaLink: '#products'
  },
  {
    id: 'promo-2',
    type: 'image',
    src: '/lovable-uploads/30d95a57-de6c-4e42-83bd-1515117475a3.png',
    alt: 'Premium Strains Available',
    title: 'New Arrivals',
    description: 'Explore our latest premium strains',
    ctaText: 'View Collection',
    ctaLink: '#products'
  },
  {
    id: 'promo-3',
    type: 'image',
    src: '/lovable-uploads/4a8b1f8c-1f90-405b-ab2e-aa97667f73b6.png',
    alt: 'Special Offers',
    title: 'Limited Time Offer',
    description: 'Premium quality at unbeatable prices',
    ctaText: 'Learn More',
    ctaLink: '#products'
  },
  {
    id: 'promo-4',
    type: 'image',
    src: '/lovable-uploads/63f604cb-781b-4f08-9606-8328130488ad.png',
    alt: 'Quality Cannabis Products',
    title: 'Top Shelf Quality',
    description: 'Curated selection of premium products',
    ctaText: 'Discover More',
    ctaLink: '#products'
  }
];
