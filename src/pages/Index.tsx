import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { WhiskeyProduct, SearchFilters } from '../types/whiskey';
import { whiskeyCollection } from '../data';
import { Navigation } from '../components/Navigation';
import { TastingNotesModal } from '../components/TastingNotesModal';
import { WhiskeyDetail } from '../components/WhiskeyDetail';
import { HeroSection } from '../components/HeroSection';
import { FeaturedCollection } from '../components/FeaturedCollection';
import { FiltersSection } from '../components/FiltersSection';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { SearchFilters as SearchFiltersComponent } from '../components/SearchFilters';

const Index = () => {
  const [selectedWhiskey, setSelectedWhiskey] = useState<WhiskeyProduct | null>(null);
  const [tastingModalWhiskey, setTastingModalWhiskey] = useState<WhiskeyProduct | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  // Fuse.js configuration for fuzzy search
  const fuseOptions = {
    keys: [
      { name: 'name', weight: 0.3 },
      { name: 'brand', weight: 0.2 },
      { name: 'origin', weight: 0.15 },
      { name: 'grower', weight: 0.15 },
      { name: 'type', weight: 0.1 },
      { name: 'flavor', weight: 0.05 },
      { name: 'description', weight: 0.05 }
    ],
    threshold: 0.4, // Allow for misspellings
    distance: 100,
    includeScore: true
  };

  const fuse = new Fuse(whiskeyCollection, fuseOptions);

  const filteredWhiskies = useMemo(() => {
    console.log('Search triggered with:', quickSearch);
    let results = whiskeyCollection;

    // Quick search with fuzzy matching
    if (quickSearch && quickSearch.trim()) {
      const searchResults = fuse.search(quickSearch.trim());
      console.log('Fuse search results:', searchResults.length, 'items found');
      results = searchResults.map(result => result.item);
      console.log('Mapped results:', results.length);
    }

    // Apply advanced filters
    const finalResults = results.filter(whiskey => {
      if (filters.searchTerm && filters.searchTerm.trim()) {
        const searchResults = fuse.search(filters.searchTerm.trim());
        const fuzzyMatches = searchResults.map(result => result.item);
        if (!fuzzyMatches.includes(whiskey)) return false;
      }

      if (filters.type && filters.type.length > 0 && !filters.type.includes(whiskey.type)) {
        return false;
      }

      if (filters.origin && filters.origin.length > 0 && !filters.origin.includes(whiskey.origin)) {
        return false;
      }

      if (filters.rarity && filters.rarity.length > 0 && !filters.rarity.includes(whiskey.rarity)) {
        return false;
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (whiskey.price < min || whiskey.price > max) return false;
      }

      if (filters.thcRange && whiskey.thcContent) {
        const [min, max] = filters.thcRange;
        if (whiskey.thcContent < min || whiskey.thcContent > max) return false;
      }

      if (filters.inStock && !whiskey.inStock) {
        return false;
      }

      return true;
    });

    console.log('Final filtered results:', finalResults.length);
    return finalResults;
  }, [filters, quickSearch, fuse]);

  const featuredWhiskies = whiskeyCollection.filter(w => w.featured);

  const handleClearFilters = () => {
    setFilters({});
    setQuickSearch('');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      

      <div className="relative">
        <HeroSection 
          quickSearch={quickSearch}
          onQuickSearchChange={setQuickSearch}
        />
        
        <div className="flex justify-center -mt-8 mb-8 lg:hidden">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-background/90 backdrop-blur-sm"
              >
                Show Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl text-smokey">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 overflow-y-auto">
                <SearchFiltersComponent filters={filters} onFiltersChange={setFilters} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Show search results immediately if there's a search, otherwise show featured collection */}
      {quickSearch ? (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="mb-6">
            <h2 className="font-serif text-3xl text-smokey mb-2">Search Results</h2>
            <p className="text-muted-foreground">Found {filteredWhiskies.length} matches for "{quickSearch}"</p>
          </div>
          <ProductGrid 
            filteredWhiskies={filteredWhiskies}
            onWhiskeyClick={setSelectedWhiskey}
            onTastingClick={setTastingModalWhiskey}
            onClearFilters={handleClearFilters}
          />
        </div>
      ) : (
        <>
          <FeaturedCollection 
            featuredWhiskies={featuredWhiskies}
            onWhiskeyClick={setSelectedWhiskey}
          />

          <div className="max-w-7xl mx-auto px-4 pb-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="hidden lg:block">
                <FiltersSection 
                  filters={filters}
                  onFiltersChange={setFilters}
                  showFilters={true}
                  onToggleFilters={() => {}}
                />
              </div>

              <ProductGrid 
                filteredWhiskies={filteredWhiskies}
                onWhiskeyClick={setSelectedWhiskey}
                onTastingClick={setTastingModalWhiskey}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </>
      )}

      {selectedWhiskey && (
        <WhiskeyDetail
          whiskey={selectedWhiskey}
          onClose={() => setSelectedWhiskey(null)}
        />
      )}

      {tastingModalWhiskey && (
        <TastingNotesModal
          whiskey={tastingModalWhiskey}
          isOpen={!!tastingModalWhiskey}
          onClose={() => setTastingModalWhiskey(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;