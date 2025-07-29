import React from 'react';
import { Star } from 'lucide-react';
import { Label } from './ui/label';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  label: string;
  required?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  value, 
  onChange, 
  label, 
  required = false 
}) => (
  <div className="space-y-2">
    <Label className="text-sm text-muted-foreground">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-colors hover:scale-110"
          aria-label={`Rate ${star} stars`}
        >
          <Star 
            className={`h-6 w-6 ${
              star <= value 
                ? 'text-primary fill-primary' 
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
    {required && value === 0 && (
      <p className="text-sm text-destructive">Rating is required</p>
    )}
  </div>
);