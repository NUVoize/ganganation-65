import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { whiskeyCollection } from '../data';

interface AvailableSKUsProps {
  setSkuInput: (sku: string) => void;
}

export const AvailableSKUs: React.FC<AvailableSKUsProps> = ({ setSkuInput }) => {
  return (
    <Card className="glass-card mt-8">
      <CardHeader>
        <CardTitle className="font-serif text-lg text-smokey">Available SKUs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {whiskeyCollection.slice(0, 12).map(whiskey => (
            <Button
              key={whiskey.id}
              variant="ghost"
              size="sm"
              onClick={() => setSkuInput(whiskey.sku)}
              className="font-mono text-xs justify-start"
            >
              {whiskey.sku}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Click any SKU above to try it out
        </p>
      </CardContent>
    </Card>
  );
};