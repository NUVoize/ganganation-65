import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card/20 backdrop-blur-md border-t border-border/30 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="font-serif text-xl text-natural mb-2">THE MAGIC VAULT</h3>
        <p className="text-muted-foreground text-sm">
          Curating the world's Budds for the discerning connoisseur
        </p>
        <p className="text-muted-foreground text-xs mt-2">
          Powered by BRKN TRIB
        </p>
        <div className="flex justify-center space-x-4 mt-4 text-xs text-muted-foreground">
          <span>SKU System Integrated</span>
          <span>•</span>
          <span>Premium Collection</span>
          <span>•</span>
          <span>Expert Curation</span>
        </div>
      </div>
    </footer>
  );
};