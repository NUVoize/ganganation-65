import React from 'react';
import { CannabisProduct } from '@/types/whiskey';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';
import { BrandBadge } from './BrandBadge';
import { cn } from '@/lib/utils';

interface BrandFlavorListProps {
  brand: string;
  products: CannabisProduct[];
  onBack: () => void;
  onProductSelect: (product: CannabisProduct) => void;
}

export const BrandFlavorList: React.FC<BrandFlavorListProps> = ({ 
  brand, 
  products, 
  onBack,
  onProductSelect 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Brands
        </Button>
        
        <div className="flex items-center gap-4">
          <BrandBadge brand={brand} size="md" />
          <div>
            <h2 className="font-serif text-2xl text-foreground">
              {brand}
            </h2>
            <p className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {products.map((product) => {
          const price = typeof product.price === 'number' 
            ? product.price 
            : product.price['3.5g'];
          
          return (
            <Card
              key={product.id}
              className={cn(
                "glass-card cursor-pointer transition-all hover:bg-accent/50",
                "border-border/50"
              )}
              onClick={() => onProductSelect(product)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      {product.name}
                    </h3>
                    {product.pairing && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {product.pairing}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-medium text-deco">
                      ${price.toFixed(2)}
                    </div>
                    {!product.inStock && (
                      <span className="text-xs text-muted-foreground">
                        Out of stock
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
