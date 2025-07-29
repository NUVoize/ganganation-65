import React from 'react';
import { Card, CardContent } from './ui/card';
import { Package } from 'lucide-react';

interface NotFoundMessageProps {
  notFound: boolean;
  skuInput: string;
}

export const NotFoundMessage: React.FC<NotFoundMessageProps> = ({
  notFound,
  skuInput
}) => {
  if (!notFound) return null;

  return (
    <Card className="glass-card">
      <CardContent className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <Package className="h-16 w-16 mx-auto opacity-50 mb-4" />
          <h3 className="font-serif text-xl mb-2">SKU Not Found</h3>
          <p>No whiskey found with SKU: <span className="font-mono">{skuInput}</span></p>
          <p className="text-sm mt-2">Please check the SKU and try again.</p>
        </div>
      </CardContent>
    </Card>
  );
};