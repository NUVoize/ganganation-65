import React, { useState } from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { Navigation } from '../components/Navigation';
import { SKUScanner } from '../components/SKUScanner';
import { WhiskeyDetail } from '../components/WhiskeyDetail';

const ScannerPage: React.FC = () => {
  const [selectedWhiskey, setSelectedWhiskey] = useState<WhiskeyProduct | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      <SKUScanner onWhiskeyFound={setSelectedWhiskey} />
      
      {selectedWhiskey && (
        <WhiskeyDetail
          whiskey={selectedWhiskey}
          onClose={() => setSelectedWhiskey(null)}
        />
      )}
    </div>
  );
};

export default ScannerPage;