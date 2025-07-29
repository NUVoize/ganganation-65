import { WhiskeyProduct } from '../types/whiskey';
import bottle1Img from '../assets/whiskey-bottle-1.jpg';
import bottle2Img from '../assets/whiskey-bottle-2.jpg';
import bottle3Img from '../assets/whiskey-bottle-3.jpg';
import bottle4Img from '../assets/whiskey-bottle-4.jpg';
import bottle5Img from '../assets/whiskey-bottle-5.jpg';

export const bourbonWhiskies: WhiskeyProduct[] = [
  {
    id: '5',
    name: 'Maker\'s Mark',
    brand: 'Maker\'s Mark',
    type: 'Bourbon',
    price: 11,
    abv: 45,
    origin: 'United States',
    region: 'Kentucky',
    distillery: 'Maker\'s Mark Distillery',
    description: 'Handmade bourbon whisky with a soft, smooth taste. Made with red winter wheat instead of rye for a unique flavor profile.',
    tastingNotes: {
      nose: ['Honey', 'Vanilla', 'Orange', 'Spice'],
      palate: ['Sweet', 'Vanilla', 'Caramel', 'Fruity'],
      finish: ['Smooth', 'Pleasant', 'Warm']
    },
    color: 'Deep amber',
    servingRecommendation: 'Neat, on the rocks, or in premium cocktails',
    images: [bottle4Img],
    sku: 'MM-005',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '6',
    name: 'Wild Turkey 101',
    brand: 'Wild Turkey',
    type: 'Bourbon',
    price: 8,
    abv: 50.5,
    origin: 'United States',
    region: 'Kentucky',
    distillery: 'Wild Turkey Distillery',
    description: 'A classic high-proof bourbon with bold flavor and character. Aged in new charred oak barrels for deep, rich taste.',
    tastingNotes: {
      nose: ['Vanilla', 'Caramel', 'Orange zest', 'Spice'],
      palate: ['Full-bodied', 'Spicy', 'Sweet', 'Oak'],
      finish: ['Long', 'Warm', 'Peppery']
    },
    color: 'Deep copper',
    servingRecommendation: 'Neat for purists, excellent in cocktails',
    images: ['/lovable-uploads/d404a791-4218-4019-a4e6-52d41baf3e3a.png'],
    sku: 'WT101-006',
    inStock: true,
    featured: true,
    rarity: 'Common'
  },
  {
    id: '9',
    name: '1792 Small Batch',
    brand: '1792',
    type: 'Bourbon',
    price: 29,
    abv: 46.85,
    origin: 'United States',
    region: 'Kentucky',
    distillery: 'Barton 1792 Distillery',
    description: 'A high-rye bourbon with complex flavors and smooth finish. Named after the year Kentucky became a state.',
    tastingNotes: {
      nose: ['Vanilla', 'Caramel', 'Honey', 'Spice'],
      palate: ['Sweet vanilla', 'Oak', 'Pepper', 'Fruit'],
      finish: ['Long', 'Smooth', 'Warming spice']
    },
    color: 'Deep amber',
    servingRecommendation: 'Neat or on the rocks',
    images: [bottle3Img],
    sku: '1792-SB-009',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '10',
    name: '1792 Single Barrel',
    brand: '1792',
    type: 'Bourbon',
    price: 29,
    abv: 49.3,
    origin: 'United States',
    region: 'Kentucky',
    distillery: 'Barton 1792 Distillery',
    description: 'Hand-selected single barrel bourbon with unique character from each barrel.',
    tastingNotes: {
      nose: ['Rich caramel', 'Vanilla', 'Oak', 'Dried fruit'],
      palate: ['Full-bodied', 'Spicy', 'Sweet', 'Complex'],
      finish: ['Long', 'Robust', 'Peppery']
    },
    color: 'Rich copper',
    servingRecommendation: 'Best enjoyed neat',
    images: [bottle4Img],
    sku: '1792-SB-010',
    inStock: true,
    featured: false,
    rarity: 'Limited'
  },
  {
    id: '11',
    name: '1792 Full Proof',
    brand: '1792',
    type: 'Bourbon',
    price: 29,
    abv: 62.5,
    origin: 'United States',
    region: 'Kentucky',
    distillery: 'Barton 1792 Distillery',
    description: 'Bottled at barrel proof for maximum flavor intensity. Uncut and unfiltered.',
    tastingNotes: {
      nose: ['Intense vanilla', 'Caramel', 'Oak', 'Spice'],
      palate: ['Full proof heat', 'Rich sweetness', 'Pepper', 'Dark fruit'],
      finish: ['Very long', 'Warming', 'Complex spice']
    },
    color: 'Dark amber',
    servingRecommendation: 'With a splash of water or neat for enthusiasts',
    images: [bottle5Img],
    sku: '1792-FP-011',
    inStock: true,
    featured: true,
    rarity: 'Limited'
  },
  {
    id: '21',
    name: 'George Remus',
    brand: 'George Remus',
    type: 'Bourbon',
    price: 22,
    abv: 47,
    origin: 'United States',
    region: 'Kentucky',
    distillery: 'Ross & Squibb Distillery',
    description: 'Named after the famous bootlegger, this high-rye bourbon delivers bold flavor.',
    tastingNotes: {
      nose: ['Vanilla', 'Caramel', 'Spice', 'Oak'],
      palate: ['Sweet vanilla', 'Spicy rye', 'Caramel', 'Pepper'],
      finish: ['Medium-long', 'Spicy', 'Warm']
    },
    color: 'Amber',
    servingRecommendation: 'Perfect for cocktails or neat',
    images: [bottle4Img],
    sku: 'GR-022',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '22',
    name: "Maker's 46",
    brand: "Maker's Mark",
    type: 'Bourbon',
    price: 22,
    abv: 47,
    origin: 'United States',
    region: 'Kentucky',
    distillery: "Maker's Mark Distillery",
    description: 'Enhanced with French oak staves for additional complexity and spice.',
    tastingNotes: {
      nose: ['Vanilla', 'Caramel', 'Spice', 'Oak'],
      palate: ['Rich vanilla', 'Spicy oak', 'Caramel', 'Smooth'],
      finish: ['Long', 'Spicy', 'Complex']
    },
    color: 'Deep amber',
    servingRecommendation: 'Neat or on the rocks',
    images: [bottle5Img],
    sku: 'MM46-023',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '23',
    name: "Angel's Envy",
    brand: "Angel's Envy",
    type: 'Bourbon',
    price: 22,
    abv: 43.3,
    origin: 'United States',
    region: 'Kentucky',
    distillery: 'Louisville Distilling Co.',
    description: 'Finished in port wine casks for a unique sweet and complex flavor profile.',
    tastingNotes: {
      nose: ['Vanilla', 'Raisins', 'Maple syrup', 'Toasted nuts'],
      palate: ['Sweet vanilla', 'Port wine', 'Caramel', 'Fruit'],
      finish: ['Smooth', 'Sweet', 'Fruity']
    },
    color: 'Golden honey',
    servingRecommendation: 'Best enjoyed neat',
    images: [bottle1Img],
    sku: 'AE-024',
    inStock: true,
    featured: true,
    rarity: 'Limited'
  },
  {
    id: '24',
    name: "Jack Daniel's Old No.7",
    brand: "Jack Daniel's",
    type: 'Bourbon',
    price: 18,
    abv: 40,
    origin: 'United States',
    region: 'Tennessee',
    distillery: 'Jack Daniel Distillery',
    description: 'The iconic Tennessee whiskey, charcoal mellowed for smoothness.',
    tastingNotes: {
      nose: ['Vanilla', 'Caramel', 'Banana', 'Charcoal'],
      palate: ['Sweet vanilla', 'Caramel', 'Smooth', 'Charcoal'],
      finish: ['Medium', 'Smooth', 'Sweet']
    },
    color: 'Amber',
    servingRecommendation: 'Great neat, on rocks, or in cocktails',
    images: [bottle2Img],
    sku: 'JD-NO7-025',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '25',
    name: "Jack Daniel's Gentleman Jack",
    brand: "Jack Daniel's",
    type: 'Bourbon',
    price: 18,
    abv: 40,
    origin: 'United States',
    region: 'Tennessee',
    distillery: 'Jack Daniel Distillery',
    description: 'Double-mellowed through charcoal for exceptional smoothness.',
    tastingNotes: {
      nose: ['Vanilla', 'Caramel', 'Oak', 'Smooth'],
      palate: ['Extra smooth', 'Vanilla', 'Caramel', 'Balanced'],
      finish: ['Smooth', 'Clean', 'Gentle']
    },
    color: 'Rich amber',
    servingRecommendation: 'Perfect neat or on the rocks',
    images: [bottle3Img],
    sku: 'JD-GJ-026',
    inStock: true,
    featured: false,
    rarity: 'Common'
  },
  {
    id: '26',
    name: "Jack Daniel's Single Barrel",
    brand: "Jack Daniel's",
    type: 'Bourbon',
    price: 18,
    abv: 45,
    origin: 'United States',
    region: 'Tennessee',
    distillery: 'Jack Daniel Distillery',
    description: 'Hand-selected from single barrels for unique character.',
    tastingNotes: {
      nose: ['Rich vanilla', 'Caramel', 'Oak', 'Spice'],
      palate: ['Full flavor', 'Vanilla', 'Oak', 'Complex'],
      finish: ['Long', 'Rich', 'Satisfying']
    },
    color: 'Deep amber',
    servingRecommendation: 'Best enjoyed neat',
    images: [bottle4Img],
    sku: 'JD-SB-027',
    inStock: true,
    featured: false,
    rarity: 'Limited'
  }
];