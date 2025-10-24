import { CannabisProduct } from '../types/whiskey';
import papersData from './rolling_papers_list_details.json';

interface RawPaperProduct {
  name: string;
  brand: string;
  origin: string;
  description: string;
  price: number;
  pack_count: string;
  material: string;
  size: string;
  sku: string;
  images: string[];
}

const transformPaperProduct = (raw: RawPaperProduct, index: number): CannabisProduct => {
  const isGrinder = raw.brand.toLowerCase().includes('blaze');
  const isLeafWrap = raw.material.toLowerCase().includes('tobacco');
  const isHempWrap = raw.material.toLowerCase().includes('hemp') && raw.brand.toLowerCase().includes('juicy hemp');
  
  return {
    id: `paper-${index + 1}`,
    name: raw.name,
    brand: raw.brand,
    type: isGrinder ? 'Pre-Roll' : isLeafWrap || isHempWrap ? 'Pre-Roll' : 'Pre-Roll',
    thcContent: undefined,
    cbdContent: undefined,
    price: raw.price,
    origin: raw.origin,
    region: undefined,
    grower: raw.brand,
    description: raw.description,
    effects: {
      primary: isGrinder ? ['Preparation'] : ['Smoking'],
      secondary: [],
      duration: []
    },
    flavor: raw.brand,
    pairing: raw.material,
    images: raw.images.map(img => {
      if (img.includes('DSCF2195') || img.includes('DSCF2204') || img.includes('DSCF2218') || 
          img.includes('DSCF2231') || img.includes('DSCF2239') || img.includes('DSCF2251') ||
          img.includes('DSCF2263') || img.includes('DSCF2273') || img.includes('DSCF2276') || 
          img.includes('DSCF2288')) {
        return img.includes('300') ? `/hash_images_300/${img}` : `/hash_images_800/${img}`;
      }
      if (img.includes('DSCF2037') || img.includes('DSCF2041') || img.includes('DSCF2050') ||
          img.includes('DSCF2057') || img.includes('DSCF2067') || img.includes('DSCF2069') ||
          img.includes('DSCF2075') || img.includes('DSCF2079') || img.includes('DSCF2089') ||
          img.includes('DSCF2096') || img.includes('DSCF2099') || img.includes('DSCF2111') ||
          img.includes('DSCF2116') || img.includes('DSCF2123') || img.includes('DSCF2125') ||
          img.includes('DSCF2137') || img.includes('DSCF2148') || img.includes('DSCF2164') ||
          img.includes('DSCF2170') || img.includes('DSCF2176') || img.includes('DSCF2179') ||
          img.includes('DSCF2188')) {
        return img.includes('300') ? `/mushroom_images_300/${img}` : `/mushroom_images_800/${img}`;
      }
      return `/papers_images/${img}`;
    }),
    videoUrl: undefined,
    awards: [],
    sku: raw.sku,
    inStock: true,
    featured: false,
    rarity: isGrinder ? 'Limited' : raw.price > 10 ? 'Limited' : 'Common'
  };
};

export const rollingPapers: CannabisProduct[] = (papersData as RawPaperProduct[]).map(transformPaperProduct);
