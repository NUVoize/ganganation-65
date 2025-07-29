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
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6 animate-fade-in flex justify-center">
          <img 
            src="/lovable-uploads/ad7f4688-7699-4e58-8246-b7f4c52d2723.png" 
            alt="GANJA NATION - Premium Quality" 
            className="h-32 md:h-48 w-auto neon-glow animate-fade-in"
          />
        </div>
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
  );
};