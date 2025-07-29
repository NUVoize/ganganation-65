import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { whiskeyCollection } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TastingNotes: React.FC = () => {
  const { userInteractions, removeTastingNote } = useUser();
  const navigate = useNavigate();
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  const toggleNoteExpansion = (noteId: string) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(noteId)) {
      newExpanded.delete(noteId);
    } else {
      newExpanded.add(noteId);
    }
    setExpandedNotes(newExpanded);
  };

  const getWhiskeyById = (id: string) => whiskeyCollection.find(w => w.id === id);

  const sortedNotes = [...userInteractions.tastingNotes].sort(
    (a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()
  );

  if (sortedNotes.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-serif text-4xl text-smokey mb-8 text-center">My Tasting Notes</h1>
          <Card className="glass-card text-center py-16">
            <CardContent>
              <h3 className="font-serif text-2xl text-muted-foreground mb-4">No tasting notes yet</h3>
              <p className="text-muted-foreground mb-6">
                Start tasting and recording your impressions of different whiskeys.
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="btn-premium"
              >
                Explore Collection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl text-smokey">My Tasting Notes</h1>
          <div className="text-muted-foreground">
            {sortedNotes.length} tasting{sortedNotes.length !== 1 ? 's' : ''} recorded
          </div>
        </div>

        <div className="space-y-6">
          {sortedNotes.map(note => {
            const whiskey = getWhiskeyById(note.whiskeyId);
            const isExpanded = expandedNotes.has(note.id);
            
            if (!whiskey) return null;

            return (
              <Card key={note.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-serif text-xl text-smokey mb-2">
                        {whiskey.name}
                      </CardTitle>
                      <p className="text-muted-foreground mb-3">{whiskey.brand}</p>
                      
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= note.rating
                                  ? 'text-primary fill-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            ({note.rating}/5)
                          </span>
                        </div>
                        
                        <Badge variant="outline" className="text-xs">
                          {note.dateCreated.toLocaleDateString()}
                        </Badge>
                      </div>

                      {/* Individual ratings */}
                      {(note.aromaRating || note.tasteRating || note.finishRating) && (
                        <div className="flex space-x-4 text-sm text-muted-foreground mb-3">
                          {note.aromaRating && (
                            <span>Aroma: {note.aromaRating}/5</span>
                          )}
                          {note.tasteRating && (
                            <span>Taste: {note.tasteRating}/5</span>
                          )}
                          {note.finishRating && (
                            <span>Finish: {note.finishRating}/5</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTastingNote(note.id)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className={`text-muted-foreground ${!isExpanded && note.notes.length > 200 ? 'line-clamp-3' : ''}`}>
                        {note.notes}
                      </p>
                      {note.notes.length > 200 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleNoteExpansion(note.id)}
                          className="mt-2 text-primary hover:text-primary-foreground hover:bg-primary/10"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </Button>
                      )}
                    </div>
                    
                    {note.tastingConditions && (
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Conditions:</span> {note.tastingConditions}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};