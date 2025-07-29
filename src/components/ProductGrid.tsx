import React from 'react';
import { WhiskeyProduct, SearchFilters } from '../types/whiskey';
import { WhiskeyCard } from './WhiskeyCard';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ProductGridProps {
  filteredWhiskies: WhiskeyProduct[];
  onWhiskeyClick: (whiskey: WhiskeyProduct) => void;
  onTastingClick: (whiskey: WhiskeyProduct) => void;
  onClearFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  filteredWhiskies,
  onWhiskeyClick,
  onTastingClick,
  onClearFilters
}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-natural">
          Our Collection
          <span className="text-sm text-muted-foreground ml-2">
            ({filteredWhiskies.length} strains)
          </span>
        </h2>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-xs">
            Premium Spirits
          </Badge>
        </div>
      </div>

      {filteredWhiskies.length === 0 ? (
        <Card className="glass-card text-center py-12">
          <CardContent>
            <h3 className="font-serif text-xl text-muted-foreground mb-2">No whiskeys found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to discover more whiskeys.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onClearFilters}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWhiskies.map(whiskey => (
            <WhiskeyCard
              key={whiskey.id}
              whiskey={whiskey}
              onClick={onWhiskeyClick}
              onTastingClick={onTastingClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};