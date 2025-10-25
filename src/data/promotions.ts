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
    id: 'promo-sunday',
    type: 'image',
    src: '/banners/tiragedimanche_1.jpg',
    alt: 'TikTok Live Sunday - Half Pound Special'
  },
  {
    id: 'promo-monday',
    type: 'image',
    src: '/banners/lundi-20_2.jpg',
    alt: 'Monday Prime Time - 20% Off'
  },
  {
    id: 'promo-wednesday',
    type: 'image',
    src: '/banners/mercredi_4ieme_2.jpg',
    alt: 'Wednesday 4-for-3 Special Deal'
  }
];
