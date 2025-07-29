import { CannabisProduct } from '../types/whiskey';
import bottle1Img from '../assets/whiskey-bottle-1.jpg';
import bottle2Img from '../assets/whiskey-bottle-2.jpg';
import bottle3Img from '../assets/whiskey-bottle-3.jpg';
import bottle4Img from '../assets/whiskey-bottle-4.jpg';
import bottle5Img from '../assets/whiskey-bottle-5.jpg';

export const indicaStrains: CannabisProduct[] = [
  {
    id: '1',
    name: 'Northern Lights',
    brand: 'Green Mountain',
    type: 'Indica',
    thcContent: 18,
    cbdContent: 1,
    price: 12,
    origin: 'Canada',
    region: 'British Columbia',
    grower: 'Green Mountain Farms',
    description: 'A legendary indica strain known for its relaxing and sedating effects. Perfect for evening use.',
    effects: {
      primary: ['Relaxed', 'Happy', 'Sleepy'],
      secondary: ['Euphoric', 'Hungry'],
      duration: ['2-3 hours', 'Long lasting', 'Deep body high']
    },
    flavor: 'Sweet and spicy with earthy undertones',
    pairing: 'Best with comfort food, movies, or meditation',
    images: [bottle1Img],
    sku: 'NL-001',
    inStock: true,
    featured: true,
    rarity: 'Common'
  },
  {
    id: '2',
    name: 'Granddaddy Purple',
    brand: 'Purple Rain Co.',
    type: 'Indica',
    thcContent: 20,
    cbdContent: 0.5,
    price: 15,
    origin: 'Canada',
    region: 'Ontario',
    grower: 'Purple Rain Cultivation',
    description: 'A potent indica with beautiful purple hues and grape-like flavors. Known for full-body relaxation.',
    effects: {
      primary: ['Relaxed', 'Euphoric', 'Sleepy'],
      secondary: ['Happy', 'Hungry'],
      duration: ['2-4 hours', 'Heavy body', 'Couch lock']
    },
    flavor: 'Sweet grape and berry with hints of pine',
    pairing: 'Perfect with desserts, bath time, or bedtime routine',
    images: [bottle2Img],
    sku: 'GDP-002',
    inStock: true,
    featured: false,
    rarity: 'Limited'
  },
  {
    id: '3',
    name: 'Bubba Kush',
    brand: 'Kush Kingdom',
    type: 'Indica',
    thcContent: 19,
    cbdContent: 1.2,
    price: 14,
    origin: 'Canada',
    region: 'Alberta',
    grower: 'Kush Kingdom Gardens',
    description: 'A classic indica with tranquilizing effects and sweet hashish flavors.',
    effects: {
      primary: ['Relaxed', 'Happy', 'Sleepy'],
      secondary: ['Euphoric', 'Focused'],
      duration: ['2-3 hours', 'Heavy relaxation', 'Mind clearing']
    },
    flavor: 'Sweet and earthy with chocolate notes',
    pairing: 'Great with yoga, massage, or quiet evenings',
    images: [bottle3Img],
    sku: 'BK-003',
    inStock: true,
    featured: false,
    rarity: 'Common'
  }
];

export const sativaStrains: CannabisProduct[] = [
  {
    id: '4',
    name: 'Green Crack',
    brand: 'Energy Labs',
    type: 'Sativa',
    thcContent: 22,
    cbdContent: 0.3,
    price: 16,
    origin: 'Canada',
    region: 'Quebec',
    grower: 'Energy Labs Cultivation',
    description: 'An energizing sativa with citrus flavors that provides focus and creativity.',
    effects: {
      primary: ['Energetic', 'Happy', 'Focused'],
      secondary: ['Creative', 'Uplifted'],
      duration: ['2-3 hours', 'Mental clarity', 'Active high']
    },
    flavor: 'Citrus and tropical fruit with earthy undertones',
    pairing: 'Perfect for outdoor activities, creative projects, or social gatherings',
    images: [bottle4Img],
    sku: 'GC-004',
    inStock: true,
    featured: true,
    rarity: 'Common'
  },
  {
    id: '5',
    name: 'Sour Diesel',
    brand: 'Diesel Dreams',
    type: 'Sativa',
    thcContent: 24,
    cbdContent: 0.4,
    price: 18,
    origin: 'Canada',
    region: 'Manitoba',
    grower: 'Diesel Dreams Farm',
    description: 'A fast-acting sativa with pungent diesel aromas and energizing effects.',
    effects: {
      primary: ['Energetic', 'Happy', 'Uplifted'],
      secondary: ['Creative', 'Focused'],
      duration: ['3-4 hours', 'Cerebral high', 'Long lasting']
    },
    flavor: 'Pungent diesel with hints of lemon and herbs',
    pairing: 'Ideal for daytime activities, work, or exercise',
    images: [bottle5Img],
    sku: 'SD-005',
    inStock: true,
    featured: false,
    rarity: 'Limited'
  }
];

export const hybridStrains: CannabisProduct[] = [
  {
    id: '6',
    name: 'Blue Dream',
    brand: 'Dream State',
    type: 'Hybrid',
    thcContent: 21,
    cbdContent: 0.8,
    price: 17,
    origin: 'Canada',
    region: 'British Columbia',
    grower: 'Dream State Gardens',
    description: 'A balanced hybrid offering gentle cerebral invigoration with full-body relaxation.',
    effects: {
      primary: ['Happy', 'Relaxed', 'Euphoric'],
      secondary: ['Creative', 'Focused'],
      duration: ['2-4 hours', 'Balanced high', 'Versatile']
    },
    flavor: 'Sweet berry with hints of vanilla and spice',
    pairing: 'Great for any time of day, social events, or creative pursuits',
    images: [bottle1Img],
    sku: 'BD-006',
    inStock: true,
    featured: true,
    rarity: 'Common'
  },
  {
    id: '7',
    name: 'Girl Scout Cookies',
    brand: 'Cookie Jar',
    type: 'Hybrid',
    thcContent: 25,
    cbdContent: 0.6,
    price: 20,
    origin: 'Canada',
    region: 'Ontario',
    grower: 'Cookie Jar Cultivation',
    description: 'A potent hybrid with sweet and earthy aromas, delivering euphoria and relaxation.',
    effects: {
      primary: ['Euphoric', 'Happy', 'Relaxed'],
      secondary: ['Creative', 'Giggly'],
      duration: ['3-4 hours', 'Strong effects', 'Well-rounded']
    },
    flavor: 'Sweet and earthy with mint and cherry notes',
    pairing: 'Perfect for evening socializing, gaming, or creative projects',
    images: [bottle2Img],
    sku: 'GSC-007',
    inStock: true,
    featured: false,
    rarity: 'Rare'
  }
];

export const cbdStrains: CannabisProduct[] = [
  {
    id: '8',
    name: 'Charlotte\'s Web',
    brand: 'Wellness Farm',
    type: 'CBD',
    thcContent: 0.3,
    cbdContent: 20,
    price: 25,
    origin: 'Canada',
    region: 'Nova Scotia',
    grower: 'Wellness Farm Co.',
    description: 'High-CBD strain with minimal psychoactive effects, perfect for therapeutic use.',
    effects: {
      primary: ['Relaxed', 'Focused', 'Clear-headed'],
      secondary: ['Calm', 'Balanced'],
      duration: ['2-3 hours', 'No high', 'Therapeutic']
    },
    flavor: 'Earthy and woody with pine notes',
    pairing: 'Ideal for meditation, work, or daily wellness routine',
    images: [bottle3Img],
    sku: 'CW-008',
    inStock: true,
    featured: true,
    rarity: 'Limited'
  }
];

export const concentrates: CannabisProduct[] = [
  {
    id: '9',
    name: 'Live Rosin - OG Kush',
    brand: 'Extract Elite',
    type: 'Concentrate',
    thcContent: 85,
    cbdContent: 2,
    price: 45,
    origin: 'Canada',
    region: 'British Columbia',
    grower: 'Extract Elite Labs',
    description: 'Premium live rosin with full terpene profile and potent effects.',
    effects: {
      primary: ['Intense', 'Euphoric', 'Relaxed'],
      secondary: ['Creative', 'Happy'],
      duration: ['1-2 hours', 'Very potent', 'Fast-acting']
    },
    flavor: 'Rich pine and earth with citrus highlights',
    pairing: 'Best with experienced users, evening relaxation',
    images: [bottle4Img],
    sku: 'LR-OG-009',
    inStock: true,
    featured: false,
    rarity: 'Ultra Rare'
  }
];

export const edibles: CannabisProduct[] = [
  {
    id: '10',
    name: 'Gummy Bears - Mixed Berry',
    brand: 'Sweet Dreams',
    type: 'Edible',
    thcContent: 10,
    cbdContent: 0,
    price: 8,
    origin: 'Canada',
    region: 'Ontario',
    grower: 'Sweet Dreams Kitchen',
    description: 'Delicious gummy bears with precise dosing for a controlled experience.',
    effects: {
      primary: ['Happy', 'Relaxed', 'Euphoric'],
      secondary: ['Giggly', 'Sleepy'],
      duration: ['4-6 hours', 'Long lasting', 'Body high']
    },
    flavor: 'Sweet mixed berry flavors',
    pairing: 'Perfect for movie nights, social gatherings, or relaxation',
    images: [bottle5Img],
    sku: 'GB-MB-010',
    inStock: true,
    featured: false,
    rarity: 'Common'
  }
];

export const preRolls: CannabisProduct[] = [
  {
    id: '11',
    name: 'Pre-Roll - White Widow',
    brand: 'Ready Rolled',
    type: 'Pre-Roll',
    thcContent: 19,
    cbdContent: 1,
    price: 6,
    origin: 'Canada',
    region: 'Alberta',
    grower: 'Ready Rolled Co.',
    description: 'Perfectly rolled joint of premium White Widow strain.',
    effects: {
      primary: ['Balanced', 'Happy', 'Relaxed'],
      secondary: ['Creative', 'Social'],
      duration: ['2-3 hours', 'Smooth high', 'Convenient']
    },
    flavor: 'Earthy and woody with floral notes',
    pairing: 'Great for sharing with friends or solo sessions',
    images: [bottle1Img],
    sku: 'PR-WW-011',
    inStock: true,
    featured: false,
    rarity: 'Common'
  }
];