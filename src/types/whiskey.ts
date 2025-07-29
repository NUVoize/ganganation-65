export interface WhiskeyProduct {
  id: string;
  name: string;
  brand: string;
  type: 'Single Malt' | 'Blended' | 'Bourbon' | 'Rye' | 'Irish' | 'Japanese' | 'Canadian';
  age?: number;
  price: number;
  abv: number;
  origin: string;
  region?: string;
  distillery: string;
  description: string;
  tastingNotes: {
    nose: string[];
    palate: string[];
    finish: string[];
  };
  color: string;
  servingRecommendation: string;
  images: string[];
  videoUrl?: string;
  awards?: string[];
  sku: string;
  inStock: boolean;
  featured: boolean;
  rarity: 'Common' | 'Limited' | 'Rare' | 'Ultra Rare';
}

export interface SearchFilters {
  type?: string[];
  origin?: string[];
  priceRange?: [number, number];
  ageRange?: [number, number];
  abvRange?: [number, number];
  inStock?: boolean;
  rarity?: string[];
  searchTerm?: string;
}

export interface TastingNote {
  id: string;
  whiskeyId: string;
  rating: number; // 1-5 stars
  notes: string;
  dateCreated: Date;
  tastingConditions?: string;
  aromaRating?: number;
  tasteRating?: number;
  finishRating?: number;
}

export interface UserInteractions {
  savedWhiskies: string[]; // whiskey IDs
  tastingNotes: TastingNote[];
}

export interface AssistantMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}