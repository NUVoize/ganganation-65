export interface CannabisProduct {
  id: string;
  name: string;
  brand: string;
  type: 'Indica' | 'Sativa' | 'Hybrid' | 'CBD' | 'Concentrate' | 'Edible' | 'Pre-Roll' | 'Accessories';
  thcContent?: number;
  cbdContent?: number;
  price: number;
  origin: string;
  region?: string;
  grower: string;
  description: string;
  effects: {
    primary: string[];
    secondary: string[];
    duration: string[];
  };
  flavor: string;
  pairing: string;
  images: string[];
  videoUrl?: string;
  awards?: string[];
  sku: string;
  inStock: boolean;
  featured: boolean;
  rarity: 'Common' | 'Limited' | 'Rare' | 'Ultra Rare';
}

// Compatibility export for existing components
export type WhiskeyProduct = CannabisProduct;

export interface SearchFilters {
  type?: string[];
  origin?: string[];
  priceRange?: [number, number];
  thcRange?: [number, number];
  cbdRange?: [number, number];
  inStock?: boolean;
  rarity?: string[];
  searchTerm?: string;
}

export interface TastingNote {
  id: string;
  cannabisId: string;
  whiskeyId: string; // Compatibility field
  rating: number; // 1-5 stars
  notes: string;
  dateCreated: Date;
  sessionConditions?: string;
  tastingConditions?: string; // Compatibility field
  aromaRating?: number;
  effectRating?: number;
  tasteRating?: number; // Compatibility field
  flavorRating?: number;
  finishRating?: number; // Compatibility field
}

export interface UserInteractions {
  savedCannabis: string[]; // cannabis IDs
  savedWhiskies: string[]; // Compatibility field
  tastingNotes: TastingNote[];
}

export interface AssistantMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}