import React from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { FeaturedProductCard } from './FeaturedProductCard';

interface FeaturedCollectionProps {
  featuredWhiskies: WhiskeyProduct[];
  onWhiskeyClick: (whiskey: WhiskeyProduct) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  featuredWhiskies,
  onWhiskeyClick
}) => {
  if (featuredWhiskies.length === 0) {
    return null;
  }

  return (
    <div className="px-4 mb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl text-natural mb-8 text-center">Budtender's Choice</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredWhiskies.map(whiskey => (
            <FeaturedProductCard
              key={whiskey.id}
              product={whiskey}
              onClick={onWhiskeyClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};