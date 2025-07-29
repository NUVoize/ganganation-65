import React from 'react';
import { useForm } from 'react-hook-form';
import { TastingNote, WhiskeyProduct } from '../types/whiskey';
import { useUser } from '../contexts/UserContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { StarRating } from './StarRating';
import { TastingNotesList } from './TastingNotesList';
import { 
  sanitizeInput, 
  validateRating, 
  validateNotes, 
  validateConditions 
} from '../utils/tastingValidation';

interface TastingNotesModalProps {
  whiskey: WhiskeyProduct;
  isOpen: boolean;
  onClose: () => void;
}

interface TastingFormData {
  rating: number;
  notes: string;
  tastingConditions: string;
  aromaRating: number;
  tasteRating: number;
  finishRating: number;
}


export const TastingNotesModal: React.FC<TastingNotesModalProps> = ({
  whiskey,
  isOpen,
  onClose
}) => {
  const { addTastingNote, getTastingNotesByWhiskey } = useUser();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TastingFormData>({
    defaultValues: {
      rating: 0,
      notes: '',
      tastingConditions: '',
      aromaRating: 0,
      tasteRating: 0,
      finishRating: 0
    }
  });

  const watchedValues = watch();

  const existingNotes = getTastingNotesByWhiskey(whiskey.id);

  const onSubmit = async (data: TastingFormData) => {
    try {
      // Validate all inputs
      if (!validateRating(data.rating)) {
        toast({
          title: "Invalid Rating",
          description: "Rating must be between 1 and 5 stars.",
          variant: "destructive"
        });
        return;
      }

      if (!validateNotes(data.notes)) {
        toast({
          title: "Invalid Notes",
          description: "Notes must be between 5 and 2000 characters.",
          variant: "destructive"
        });
        return;
      }

      if (!validateConditions(data.tastingConditions)) {
        toast({
          title: "Invalid Conditions",
          description: "Tasting conditions must be less than 500 characters.",
          variant: "destructive"
        });
        return;
      }

      // Sanitize all text inputs
      const sanitizedNotes = sanitizeInput(data.notes);
      const sanitizedConditions = data.tastingConditions ? sanitizeInput(data.tastingConditions) : '';

      const newNote: TastingNote = {
        id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cannabisId: whiskey.id,
        whiskeyId: whiskey.id,
        rating: data.rating,
        notes: sanitizedNotes,
        dateCreated: new Date(),
        tastingConditions: sanitizedConditions || undefined,
        aromaRating: data.aromaRating || undefined,
        tasteRating: data.tasteRating || undefined,
        finishRating: data.finishRating || undefined
      };

      addTastingNote(newNote);
      
      toast({
        title: "Tasting Note Saved",
        description: "Your tasting note has been successfully saved.",
      });
      
      reset();
      onClose();
    } catch (error) {
      console.error('Error saving tasting note:', error);
      toast({
        title: "Error",
        description: "Failed to save tasting note. Please try again.",
        variant: "destructive"
      });
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-smokey">
            Tasting Notes: {whiskey.name}
          </DialogTitle>
        </DialogHeader>

        <TastingNotesList notes={existingNotes} />

        {/* New Note Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <StarRating
            value={watchedValues.rating}
            onChange={(rating) => setValue('rating', rating)}
            label="Overall Rating"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StarRating
              value={watchedValues.aromaRating}
              onChange={(rating) => setValue('aromaRating', rating)}
              label="Aroma"
            />
            <StarRating
              value={watchedValues.tasteRating}
              onChange={(rating) => setValue('tasteRating', rating)}
              label="Taste"
            />
            <StarRating
              value={watchedValues.finishRating}
              onChange={(rating) => setValue('finishRating', rating)}
              label="Finish"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              Tasting Notes <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="notes"
              {...register('notes', {
                required: 'Tasting notes are required',
                minLength: { value: 5, message: 'Notes must be at least 5 characters' },
                maxLength: { value: 2000, message: 'Notes must be less than 2000 characters' },
                validate: (value) => validateNotes(value) || 'Invalid characters in notes'
              })}
              placeholder="Describe your tasting experience..."
              className="min-h-[100px]"
            />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditions">Tasting Conditions (Optional)</Label>
            <Input
              id="conditions"
              {...register('tastingConditions', {
                maxLength: { value: 500, message: 'Conditions must be less than 500 characters' },
                validate: (value) => !value || validateConditions(value) || 'Invalid characters in conditions'
              })}
              placeholder="e.g., Neat, with a splash of water, temperature..."
            />
            {errors.tastingConditions && (
              <p className="text-sm text-destructive">{errors.tastingConditions.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="btn-premium"
              disabled={isSubmitting || watchedValues.rating === 0}
            >
              {isSubmitting ? 'Saving...' : 'Save Tasting Note'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
