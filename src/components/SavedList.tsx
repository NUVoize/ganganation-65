import React from 'react';
import { useUser } from '../contexts/UserContext';
import { whiskeyCollection } from '../data';
import { WhiskeyCard } from './WhiskeyCard';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface SavedListProps {
  onWhiskeyClick: (whiskey: any) => void;
}

export const SavedList: React.FC<SavedListProps> = ({ onWhiskeyClick }) => {
  const { userInteractions } = useUser();
  const navigate = useNavigate();

  const savedWhiskies = whiskeyCollection.filter(whiskey => 
    userInteractions.savedWhiskies.includes(whiskey.id)
  );

  if (savedWhiskies.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-serif text-4xl text-smokey mb-8 text-center">My Saved Whiskeys</h1>
          <Card className="glass-card text-center py-16">
            <CardContent>
              <h3 className="font-serif text-2xl text-muted-foreground mb-4">No saved whiskeys yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring our collection and save your favorites for easy access.
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
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl text-smokey">My Saved Whiskeys</h1>
          <div className="text-muted-foreground">
            {savedWhiskies.length} whiskey{savedWhiskies.length !== 1 ? 's' : ''} saved
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedWhiskies.map(whiskey => (
            <WhiskeyCard
              key={whiskey.id}
              whiskey={whiskey}
              onClick={onWhiskeyClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};