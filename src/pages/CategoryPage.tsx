import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhiskeyCard } from '@/components/WhiskeyCard';
import { WhiskeyDetail } from '@/components/WhiskeyDetail';
import { TastingNotesModal } from '@/components/TastingNotesModal';
import { FiltersSection } from '@/components/FiltersSection';
import { BrandGridView } from '@/components/BrandGridView';
import { BrandFlavorList } from '@/components/BrandFlavorList';
import { SearchFilters, CannabisProduct } from '@/types/whiskey';
import { cannabisCollection } from '@/data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getPriceForComparison } from '@/utils/pricing';

const categoryMap: Record<string, { title: string; types: string[]; description: string }> = {
  weed: {
    title: 'Weed',
    types: ['Indica', 'Sativa', 'Hybrid', 'CBD'],
    description: 'Explore our premium cannabis flower strains'
  },
  concentrates: {
    title: 'Oil & Wax',
    types: ['Concentrate'],
    description: 'Premium concentrates and extracts'
  },
  hash: {
    title: 'Hash',
    types: ['Hash'],
    description: 'Traditional and artisanal hashish products'
  },
  edibles: {
    title: 'Edibles',
    types: ['Edible'],
    description: 'Cannabis-infused edible products'
  },
  shrooms: {
    title: 'Shrooms',
    types: ['Shrooms'],
    description: 'Psilocybin mushroom products'
  },
  accessories: {
    title: 'Leafs & Papers',
    types: ['Pre-Roll'],
    description: 'Premium wraps, rolling papers, and smoking accessories'
  },
  vape: {
    title: 'Vape',
    types: ['Vape'],
    description: 'Vaporizers and vape cartridges'
  }
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedWhiskey, setSelectedWhiskey] = useState<CannabisProduct | null>(null);
  const [showTastingModal, setShowTastingModal] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleToggleFilters = () => setShowFilters(!showFilters);

  if (!category || !categoryMap[category]) {
    return <Navigate to="/" replace />;
  }

  const categoryInfo = categoryMap[category];

  const fuse = useMemo(() => {
    return new Fuse(cannabisCollection, {
      keys: ['name', 'brand', 'description', 'flavor', 'effects.primary', 'effects.secondary'],
      threshold: 0.3,
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let products = cannabisCollection.filter(product => 
      categoryInfo.types.includes(product.type)
    );

    if (filters.searchTerm && filters.searchTerm.trim()) {
      const searchResults = fuse.search(filters.searchTerm);
      products = searchResults
        .map(result => result.item)
        .filter(product => categoryInfo.types.includes(product.type));
    }

    if (filters.type && filters.type.length > 0) {
      products = products.filter(p => filters.type!.includes(p.type));
    }

    if (filters.origin && filters.origin.length > 0) {
      products = products.filter(p => filters.origin!.includes(p.origin));
    }

    if (filters.priceRange) {
      products = products.filter(p => {
        const price = getPriceForComparison(p.price);
        return price >= filters.priceRange![0] && price <= filters.priceRange![1];
      });
    }

    if (filters.thcRange) {
      products = products.filter(
        p => p.thcContent && p.thcContent >= filters.thcRange![0] && p.thcContent <= filters.thcRange![1]
      );
    }

    if (filters.rarity && filters.rarity.length > 0) {
      products = products.filter(p => filters.rarity!.includes(p.rarity));
    }

    if (filters.inStock !== undefined) {
      products = products.filter(p => p.inStock === filters.inStock);
    }

    return products;
  }, [filters, fuse, categoryInfo.types]);

  const handleClearFilters = () => {
    setFilters({});
  };

  const isAccessoriesCategory = category === 'accessories';
  const brandProducts = useMemo(() => {
    if (!selectedBrand) return [];
    return filteredProducts.filter(p => p.brand === selectedBrand);
  }, [selectedBrand, filteredProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="relative pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-impact text-4xl md:text-5xl text-deco mb-4 animate-fade-in tracking-wider">
            {categoryInfo.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
          {!isAccessoriesCategory && (
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-20">
                <FiltersSection
                  filters={filters}
                  onFiltersChange={setFilters}
                  showFilters={true}
                  onToggleFilters={handleToggleFilters}
                />
              </div>
            </aside>
          )}

          <div className="flex-1 min-w-0">
            {!isAccessoriesCategory && (
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="font-serif text-2xl text-natural">
                  Available Products
                  <span className="text-sm text-muted-foreground ml-2">
                    ({filteredProducts.length} items)
                  </span>
                </h2>
                
                <div className="flex items-center gap-4">
                  <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filter Products</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersSection
                          filters={filters}
                          onFiltersChange={setFilters}
                          showFilters={true}
                          onToggleFilters={handleToggleFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Badge variant="outline" className="text-xs">
                    Premium Quality
                  </Badge>
                </div>
              </div>
            )}

            {isAccessoriesCategory && !selectedBrand && (
              <BrandGridView 
                products={filteredProducts} 
                onBrandSelect={setSelectedBrand}
              />
            )}

            {isAccessoriesCategory && selectedBrand && (
              <BrandFlavorList
                brand={selectedBrand}
                products={brandProducts}
                onBack={() => setSelectedBrand(null)}
                onProductSelect={setSelectedWhiskey}
              />
            )}

            {!isAccessoriesCategory && (
              <>
                {filteredProducts.length === 0 ? (
                  <Card className="glass-card text-center py-12">
                    <CardContent>
                      <h3 className="font-serif text-xl text-muted-foreground mb-2">No products found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters to discover more products.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={handleClearFilters}
                      >
                        Clear All Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <WhiskeyCard
                        key={product.id}
                        whiskey={product}
                        onClick={setSelectedWhiskey}
                        onTastingClick={(product) => {
                          setSelectedWhiskey(product);
                          setShowTastingModal(true);
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedWhiskey && !showTastingModal && (
        <WhiskeyDetail
          whiskey={selectedWhiskey}
          onClose={() => setSelectedWhiskey(null)}
        />
      )}

      {selectedWhiskey && showTastingModal && (
        <TastingNotesModal
          whiskey={selectedWhiskey}
          isOpen={showTastingModal}
          onClose={() => {
            setShowTastingModal(false);
            setSelectedWhiskey(null);
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default CategoryPage;
