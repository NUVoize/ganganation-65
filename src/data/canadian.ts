import { WhiskeyProduct } from '../types/whiskey';
import bottle1Img from '../assets/whiskey-bottle-1.jpg';
import bottle2Img from '../assets/whiskey-bottle-2.jpg';

export const canadianWhiskies: WhiskeyProduct[] = [
  {
    id: '29',
    name: 'Crown Royal',
    brand: 'Crown Royal',
    type: 'Canadian',
    price: 20,
    abv: 40,
    origin: 'Canada',
    region: 'Manitoba',
    distillery: 'Gimli Distillery',
    description: 'The flagship Canadian whisky with smooth, elegant character.',
    tastingNotes: {
      nose: ['Vanilla', 'Fruit', 'Oak', 'Spice'],
      palate: ['Smooth', 'Vanilla', 'Fruit', 'Balanced'],
      finish: ['Medium', 'Smooth', 'Clean']
    },
    color: 'Golden amber',
    servingRecommendation: 'Versatile - neat, rocks, or cocktails',
    images: [bottle1Img],
    sku: 'CR-030',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '30',
    name: 'Crown Royal XO',
    brand: 'Crown Royal',
    type: 'Canadian',
    price: 20,
    abv: 40,
    origin: 'Canada',
    region: 'Manitoba',
    distillery: 'Gimli Distillery',
    description: 'Finished in cognac casks for added complexity and elegance.',
    tastingNotes: {
      nose: ['Cognac influence', 'Vanilla', 'Fruit', 'Spice'],
      palate: ['Rich vanilla', 'Cognac notes', 'Smooth', 'Complex'],
      finish: ['Long', 'Elegant', 'Sophisticated']
    },
    color: 'Rich amber',
    servingRecommendation: 'Best appreciated neat',
    images: [bottle2Img],
    sku: 'CR-XO-031',
    inStock: true,
    featured: false,
    rarity: 'Limited'
  }
];