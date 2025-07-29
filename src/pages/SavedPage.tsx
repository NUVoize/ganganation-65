import React, { useState } from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { Navigation } from '../components/Navigation';
import { SavedList } from '../components/SavedList';
import { WhiskeyDetail } from '../components/WhiskeyDetail';
import { TastingNotesModal } from '../components/TastingNotesModal';

const SavedPage: React.FC = () => {
  const [selectedWhiskey, setSelectedWhiskey] = useState<WhiskeyProduct | null>(null);
  const [tastingModalWhiskey, setTastingModalWhiskey] = useState<WhiskeyProduct | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      <SavedList onWhiskeyClick={setSelectedWhiskey} />
      
      {selectedWhiskey && (
        <WhiskeyDetail
          whiskey={selectedWhiskey}
          onClose={() => setSelectedWhiskey(null)}
        />
      )}
      
      {tastingModalWhiskey && (
        <TastingNotesModal
          whiskey={tastingModalWhiskey}
          isOpen={!!tastingModalWhiskey}
          onClose={() => setTastingModalWhiskey(null)}
        />
      )}
    </div>
  );
};

export default SavedPage;