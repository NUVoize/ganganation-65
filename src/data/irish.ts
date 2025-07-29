import { WhiskeyProduct } from '../types/whiskey';
import jamesonImg from '../assets/jameson-bottle.jpg';
import kilbegganImg from '../assets/kilbeggan-bottle.jpg';
import bottle5Img from '../assets/whiskey-bottle-5.jpg';

export const irishWhiskies: WhiskeyProduct[] = [
  {
    id: '4',
    name: 'Jameson Irish Whiskey',
    brand: 'Jameson',
    type: 'Irish',
    price: 9,
    abv: 40,
    origin: 'Ireland',
    region: 'Cork',
    distillery: 'Midleton Distillery',
    description: 'Triple-distilled Irish whiskey, blended for smoothness. A perfect balance of spicy, nutty and vanilla notes.',
    tastingNotes: {
      nose: ['Light floral', 'Spice', 'Sweet sherry', 'Vanilla'],
      palate: ['Perfect balance', 'Spicy', 'Nutty', 'Vanilla'],
      finish: ['Smooth', 'Lingering', 'Light']
    },
    color: 'Golden amber',
    servingRecommendation: 'Great neat, on ice, or in cocktails',
    images: [jamesonImg],
    sku: 'JAM-004',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '7',
    name: 'Kilbeggan Irish Whiskey',
    brand: 'Kilbeggan',
    type: 'Irish',
    price: 7,
    abv: 40,
    origin: 'Ireland',
    region: 'Westmeath',
    distillery: 'Kilbeggan Distillery',
    description: 'From Ireland\'s oldest licensed distillery. A smooth, approachable Irish whiskey with traditional character.',
    tastingNotes: {
      nose: ['Honey', 'Vanilla', 'Light fruit', 'Grain'],
      palate: ['Smooth', 'Honey sweetness', 'Vanilla', 'Subtle spice'],
      finish: ['Clean', 'Gentle', 'Slightly sweet']
    },
    color: 'Light gold',
    servingRecommendation: 'Perfect neat or in Irish coffee',
    images: [kilbegganImg],
    sku: 'KIL-007',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '8',
    name: 'Bushmills Original',
    brand: 'Bushmills',
    type: 'Irish',
    price: 8,
    abv: 40,
    origin: 'Ireland',
    region: 'Antrim',
    distillery: 'Old Bushmills Distillery',
    description: 'Triple-distilled Irish whiskey aged in bourbon and sherry casks. Smooth and honey-sweet with notes of vanilla.',
    tastingNotes: {
      nose: ['Fresh fruit', 'Honey', 'Vanilla', 'Nuts'],
      palate: ['Smooth', 'Sweet honey', 'Vanilla', 'Light spice'],
      finish: ['Fresh', 'Crisp', 'Medium length']
    },
    color: 'Bright gold',
    servingRecommendation: 'Neat, with ice, or in classic cocktails',
    images: [bottle5Img],
    sku: 'BUSH-008',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '27',
    name: 'Jameson Black Barrel',
    brand: 'Jameson',
    type: 'Irish',
    price: 35,
    abv: 40,
    origin: 'Ireland',
    region: 'Cork',
    distillery: 'Midleton Distillery',
    description: 'Double charred barrels bring extra vanilla sweetness and caramel flavors.',
    tastingNotes: {
      nose: ['Butterscotch', 'Vanilla', 'Spice', 'Fruit'],
      palate: ['Rich vanilla', 'Butterscotch', 'Spice', 'Smooth'],
      finish: ['Long', 'Sweet', 'Warming']
    },
    color: 'Golden amber',
    servingRecommendation: 'Neat or with a splash of water',
    images: [jamesonImg],
    sku: 'JAM-BB-028',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '28',
    name: 'Jameson 18 Year Old',
    brand: 'Jameson',
    type: 'Irish',
    age: 18,
    price: 35,
    abv: 40,
    origin: 'Ireland',
    region: 'Cork',
    distillery: 'Midleton Distillery',
    description: 'Aged for 18 years in American and European oak for exceptional complexity.',
    tastingNotes: {
      nose: ['Rich fruit', 'Vanilla', 'Wood', 'Honey'],
      palate: ['Complex fruit', 'Vanilla', 'Spice', 'Smooth'],
      finish: ['Very long', 'Elegant', 'Sophisticated']
    },
    color: 'Deep gold',
    servingRecommendation: 'Best enjoyed neat',
    images: [bottle5Img],
    sku: 'JAM-18-029',
    inStock: true,
    featured: true,
    rarity: 'Rare'
  }
];