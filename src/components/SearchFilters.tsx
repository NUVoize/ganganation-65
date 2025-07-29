import { useState } from 'react';
import { SearchFilters as SearchFiltersType } from '../types/whiskey';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

export const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

  const whiskeyTypes = ['Single Malt', 'Blended', 'Bourbon', 'Rye', 'Irish', 'Japanese', 'Canadian'];
  const origins = ['Scotland', 'Ireland', 'United States', 'Japan', 'Canada'];
  const rarities = ['Common', 'Limited', 'Rare', 'Ultra Rare'];

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: 'type' | 'origin' | 'rarity', value: string) => {
    const currentArray = localFilters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    const emptyFilters: SearchFiltersType = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-smokey">Refine Your Selection</CardTitle>
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search Term */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
          <Input
            placeholder="Search whiskey names, brands, distilleries..."
            value={localFilters.searchTerm || ''}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="bg-muted/20"
          />
        </div>

        <Separator />

        {/* Whiskey Type */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Type</label>
          <div className="flex flex-wrap gap-2">
            {whiskeyTypes.map(type => (
              <Badge
                key={type}
                variant={localFilters.type?.includes(type) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleArrayFilter('type', type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Origin */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Origin</label>
          <div className="flex flex-wrap gap-2">
            {origins.map(origin => (
              <Badge
                key={origin}
                variant={localFilters.origin?.includes(origin) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleArrayFilter('origin', origin)}
              >
                {origin}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Price per Glass: ${localFilters.priceRange?.[0] || 0} - ${localFilters.priceRange?.[1] || 30}
          </label>
          <Slider
            value={localFilters.priceRange || [0, 30]}
            onValueChange={(value) => handleFilterChange('priceRange', value)}
            max={30}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        <Separator />

        {/* THC Range */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            THC Range: {localFilters.thcRange?.[0] || 0}% - {localFilters.thcRange?.[1] || 30}%
          </label>
          <Slider
            value={localFilters.thcRange || [0, 30]}
            onValueChange={(value) => handleFilterChange('thcRange', value)}
            max={30}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Rarity */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Rarity</label>
          <div className="flex flex-wrap gap-2">
            {rarities.map(rarity => (
              <Badge
                key={rarity}
                variant={localFilters.rarity?.includes(rarity) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleArrayFilter('rarity', rarity)}
              >
                {rarity}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* In Stock Filter */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="inStock"
            checked={localFilters.inStock || false}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded"
          />
          <label htmlFor="inStock" className="text-sm font-medium text-foreground">
            In Stock Only
          </label>
        </div>
      </CardContent>
    </Card>
  );
};