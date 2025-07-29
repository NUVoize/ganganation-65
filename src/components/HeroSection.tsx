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
            src="/lovable-uploads/cc6a257d-f047-4000-b9fb-8b7ba17b40f9.png" 
            alt="GANJA NATION" 
            className="h-32 md:h-48 w-auto"
          />
        </div>
        <h1 className="font-display text-4xl md:text-6xl text-deco mb-6 animate-fade-in tracking-wider">
          GANJA NATION Dispensary
        </h1>
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
              className="glass-card text-lg py-6 px-6 text-center bg-card/60 backdrop-blur-md transition-all duration-200 focus:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};