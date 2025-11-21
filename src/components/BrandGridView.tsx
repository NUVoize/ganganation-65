import React, { useMemo } from 'react';
import { CannabisProduct } from '@/types/whiskey';
import { BrandBadge } from './BrandBadge';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface BrandGridViewProps {
  products: CannabisProduct[];
  onBrandSelect: (brand: string) => void;
}

export const BrandGridView: React.FC<BrandGridViewProps> = ({ products, onBrandSelect }) => {
  const brandGroups = useMemo(() => {
    const groups = products.reduce((acc, product) => {
      if (!acc[product.brand]) {
        acc[product.brand] = {
          brand: product.brand,
          count: 0,
          minPrice: Infinity,
          maxPrice: 0
        };
      }
      acc[product.brand].count++;
      const price = typeof product.price === 'number' ? product.price : product.price['3.5g'];
      acc[product.brand].minPrice = Math.min(acc[product.brand].minPrice, price);
      acc[product.brand].maxPrice = Math.max(acc[product.brand].maxPrice, price);
      return acc;
    }, {} as Record<string, { brand: string; count: number; minPrice: number; maxPrice: number }>);

    return Object.values(groups);
  }, [products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brandGroups.map((group) => (
        <Card
          key={group.brand}
          className={cn(
            "glass-card cursor-pointer transition-all hover:scale-105 hover:shadow-lg",
            "border-border/50"
          )}
          onClick={() => onBrandSelect(group.brand)}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <BrandBadge brand={group.brand} size="lg" />
              
              <div className="text-center w-full">
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {group.brand}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {group.count} {group.count === 1 ? 'product' : 'products'}
                </p>
                <div className="text-deco font-medium">
                  ${group.minPrice.toFixed(2)}
                  {group.minPrice !== group.maxPrice && ` - $${group.maxPrice.toFixed(2)}`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
