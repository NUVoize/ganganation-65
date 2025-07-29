import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Package, Camera } from 'lucide-react';

interface SKUSearchInputProps {
  skuInput: string;
  setSkuInput: (value: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
  startCamera: () => void;
  isScanning: boolean;
}

export const SKUSearchInput: React.FC<SKUSearchInputProps> = ({
  skuInput,
  setSkuInput,
  handleSearch,
  clearSearch,
  startCamera,
  isScanning
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="glass-card mb-8">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-smokey flex items-center">
          <Package className="h-5 w-5 mr-2" />
          Product Lookup
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={skuInput}
              onChange={(e) => setSkuInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter SKU (e.g., WH001, WH025...)"
              className="text-lg py-6"
            />
            <Button 
              onClick={handleSearch}
              className="btn-premium"
              disabled={!skuInput.trim()}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={startCamera}
              variant="outline"
              className="flex items-center space-x-2"
              disabled={isScanning}
            >
              <Camera className="h-4 w-4" />
              <span>{isScanning ? 'Opening Camera...' : 'Scan Barcode'}</span>
            </Button>
          </div>
        </div>
        
        {skuInput && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearSearch}
            className="mt-2"
          >
            Clear
          </Button>
        )}
      </CardContent>
    </Card>
  );
};