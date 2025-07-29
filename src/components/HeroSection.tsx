import React from 'react';
import { Input } from './ui/input';

interface HeroSectionProps {
  quickSearch: string;
  onQuickSearchChange: (value: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  quickSearch,
  onQuickSearchChange
}) => {
  return (
    <div className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start mb-8">
          <img 
            src="/lovable-uploads/2c7687a0-a6fc-4816-bed1-c7c21a2ef71f.png" 
            alt="Ganja Nation Logo" 
            className="h-16 w-auto"
          />
        </div>
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Welcome to our premium cannabis dispensary. Explore our carefully curated menu, 
            featuring premium strains and products in a sophisticated, legal environment.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                placeholder="Search our cannabis menu..."
                value={quickSearch}
                onChange={(e) => onQuickSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    // Blur the input to show the search is complete
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="glass-card search-input-glow text-lg py-6 px-6 text-center bg-card/60 backdrop-blur-md transition-all duration-200 focus:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};