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
    src: '/banners/web_ganja_banner_2.4.jpg',
    alt: 'TikTok Live Sunday - Half Pound Special'
  },
  {
    id: 'promo-monday',
    type: 'image',
    src: '/banners/web_ganja_banner_3.4.jpg',
    alt: 'Monday Night Kick Off - 20% Off 8PM to 12AM'
  },
  {
    id: 'promo-wednesday',
    type: 'image',
    src: '/banners/web_ganja_banner_1.3.jpg',
    alt: 'Wednesday 4-for-3 Special Deal'
  }
];
