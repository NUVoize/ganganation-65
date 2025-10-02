import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { WhiskeyProduct } from '../types/whiskey';
import { CountryFlag } from './CountryFlag';

interface SearchResultProps {
  searchResult: WhiskeyProduct | null;
  onWhiskeyFound: (whiskey: WhiskeyProduct) => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  searchResult,
  onWhiskeyFound
}) => {
  if (!searchResult) return null;

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-gradient-amber">Found</Badge>
          <Badge variant="outline" className="font-mono">
            SKU: {searchResult.sku}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="h-32 bg-gradient-smokey rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <h3 className="font-serif text-xl text-smokey">{searchResult.brand}</h3>
              <p className="text-muted-foreground text-sm">Premium Collection</p>
            </div>
          </div>
          <h2 className="font-serif text-2xl text-smokey mb-2">{searchResult.name}</h2>
          <p className="text-muted-foreground mb-4">{searchResult.brand}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="font-medium">{searchResult.type}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Origin</p>
            <CountryFlag country={searchResult.origin} size={20} className="mt-1" />
          </div>
          {searchResult.thcContent && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">THC</p>
              <p className="font-medium">{searchResult.thcContent}%</p>
            </div>
          )}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">CBD</p>
            <p className="font-medium">{searchResult.cbdContent || 0}%</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-primary mb-2">
            ${searchResult.price.toLocaleString()}
          </p>
          <Badge 
            variant={searchResult.inStock ? "default" : "destructive"}
            className="mb-4"
          >
            {searchResult.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <Button 
          onClick={() => onWhiskeyFound(searchResult)}
          className="btn-premium w-full"
        >
          View Full Details
        </Button>
      </CardContent>
    </Card>
  );
};