import React from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageZoom } from './ImageZoom';
import { getDisplayPrice } from '@/utils/pricing';

interface FeaturedProductCardProps {
  product: WhiskeyProduct;
  onClick: (product: WhiskeyProduct) => void;
}

export const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
  product,
  onClick
}) => {
  return (
    <Card 
      className="glass-card overflow-hidden cursor-pointer hover-scale group relative"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square">
        {product.images && product.images.length > 0 ? (
          <ImageZoom
            src={product.images[0]} 
            alt={`${product.name} - Featured cannabis product`}
            className="w-full h-full"
            objectFit="cover"
            priority={true}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="w-full h-full bg-card flex items-center justify-center">
            <span className="font-serif text-2xl text-muted-foreground">{product.brand}</span>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <Badge 
            className="bg-gradient-featured text-foreground font-bold border-2 border-primary/30 animate-glow-pulse shadow-lg"
          >
            Featured
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-4">
          <h3 className="font-serif text-lg text-foreground mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-primary">
            {getDisplayPrice(product.price)}
          </p>
        </div>
      </div>
    </Card>
  );
};
