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
            src="/lovable-uploads/4a8b1f8c-1f90-405b-ab2e-aa97667f73b6.png" 
            alt="BOOTLEGGER" 
            className="h-32 md:h-48 w-auto"
          />
        </div>
        <h1 className="font-display text-4xl md:text-6xl text-deco mb-6 animate-fade-in tracking-wider">
          BOOTLEGGER Speakeasy
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Welcome to our hidden speakeasy. Explore our carefully curated whiskey menu, 
          featuring premium spirits served by the glass in true prohibition style.
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Input
              placeholder="Search our whiskey menu..."
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