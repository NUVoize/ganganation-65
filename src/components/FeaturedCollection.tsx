import React from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { WhiskeyCard } from './WhiskeyCard';

interface FeaturedCollectionProps {
  featuredWhiskies: WhiskeyProduct[];
  onWhiskeyClick: (whiskey: WhiskeyProduct) => void;
  onTastingClick: (whiskey: WhiskeyProduct) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  featuredWhiskies,
  onWhiskeyClick,
  onTastingClick
}) => {
  if (featuredWhiskies.length === 0) {
    return null;
  }

  return (
    <div className="px-4 mb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl text-natural mb-8 text-center">Budtender's Choice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWhiskies.map(whiskey => (
            <WhiskeyCard
              key={whiskey.id}
              whiskey={whiskey}
              onClick={onWhiskeyClick}
              onTastingClick={onTastingClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};