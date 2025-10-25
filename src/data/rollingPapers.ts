import { CannabisProduct } from '../types/whiskey';
import papersData from './rolling_papers_list_details.json';

interface RawPaperBrand {
  brand: string;
  default_price?: string;
  products: RawPaperProduct[];
}

interface RawPaperProduct {
  product_name: string;
  type: string;
  pack_count: string;
  flavor?: string;
  material: string;
  size?: string;
  short_desc: string;
  details_desc: string;
  images: string[];
}

interface PapersCatalog {
  catalog: RawPaperBrand[];
  pricing: any;
}

const getPriceBySize = (brand: string, size?: string, packCount?: string): number => {
  if (brand === 'Backwoods') return 15;
  if (brand === 'Juicy Hemp Wraps') return 4;
  if (brand === 'Juicy Jay\'s') return size?.includes('King') ? 3.50 : 2.50;
  if (brand === 'OCB') return size?.includes('Slim') || size?.includes('King') ? 3.50 : 2.50;
  if (brand === 'Bambú') return 2.50;
  if (brand === 'Blaze') return 10;
  return 3.00;
};

const generateSKU = (brand: string, productName: string, packCount: string): string => {
  const brandCode = brand.split(' ').map(w => w[0]).join('').toUpperCase();
  const productCode = productName.split(' ').slice(0, 2).join('-').toUpperCase();
  const packCode = packCount.replace(/\s+/g, '').toUpperCase();
  return `${brandCode}-${productCode}-${packCode}`;
};

const getProductType = (type: string, brand: string): CannabisProduct['type'] => {
  // All rolling papers, wraps, and cigars are accessories for smoking, not pre-rolls
  return 'Accessories';
};

const transformPaperProduct = (
  raw: RawPaperProduct,
  brand: RawPaperBrand,
  globalIndex: number
): CannabisProduct => {
  const price = getPriceBySize(brand.brand, raw.size, raw.pack_count);
  const sku = generateSKU(brand.brand, raw.product_name, raw.pack_count);
  const productType = getProductType(raw.type, brand.brand);
  
  return {
    id: `paper-${globalIndex + 1}`,
    name: raw.product_name,
    brand: brand.brand,
    type: productType,
    thcContent: undefined,
    cbdContent: undefined,
    price: price,
    origin: 'Various',
    region: undefined,
    grower: brand.brand,
    description: raw.short_desc,
    effects: {
      primary: productType === 'Accessories' ? ['Preparation'] : ['Smoking'],
      secondary: [],
      duration: []
    },
    flavor: raw.flavor || raw.product_name,
    pairing: raw.details_desc,
    images: raw.images.map(dscfNumber => `/papers_images_300/${dscfNumber}X300.jpg`),
    videoUrl: undefined,
    awards: [],
    sku: sku,
    inStock: true,
    featured: false,
    rarity: price > 10 ? 'Limited' : 'Common'
  };
};

const data = papersData as any;
export const rollingPapers: CannabisProduct[] = (data.catalog as RawPaperBrand[])
  .flatMap((brand, brandIndex) => 
    brand.products.map((product, productIndex) => 
      transformPaperProduct(product, brand, brandIndex * 100 + productIndex)
    )
  );
