import { Card, CardContent } from "@/components/ui/card";

interface TieredPricingProps {
  perGramPrice: number;
  className?: string;
}

export const TieredPricing = ({ perGramPrice, className }: TieredPricingProps) => {
  // Calculate tiered pricing with volume discounts
  const prices = {
    "3.5G": (perGramPrice * 3.5).toFixed(2),
    "7G": (perGramPrice * 7 * 0.95).toFixed(2), // 5% discount
    "14G": (perGramPrice * 14 * 0.90).toFixed(2), // 10% discount
    "1 OZ": (perGramPrice * 28 * 0.85).toFixed(2), // 15% discount
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Available Quantities</h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {Object.entries(prices).map(([weight, price]) => (
            <div
              key={weight}
              className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors min-w-0"
            >
              <span className="font-medium text-sm sm:text-base">{weight}</span>
              <span className="text-sm sm:text-lg font-bold text-primary truncate ml-1">${price}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Per gram: ${perGramPrice.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
};
