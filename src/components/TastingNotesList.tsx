import React from 'react';
import { TastingNote } from '../types/whiskey';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface TastingNotesListProps {
  notes: TastingNote[];
}

export const TastingNotesList: React.FC<TastingNotesListProps> = ({ notes }) => {
  if (notes.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-serif text-lg text-smokey mb-3">Your Previous Notes</h3>
      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= note.rating
                          ? 'text-primary fill-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <Badge variant="outline" className="text-xs">
                  {note.dateCreated.toLocaleDateString()}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{note.notes}</p>
            {note.tastingConditions && (
              <p className="text-xs text-muted-foreground italic">
                Conditions: {note.tastingConditions}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};