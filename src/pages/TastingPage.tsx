import React from 'react';
import { Navigation } from '../components/Navigation';
import { TastingNotes } from '../components/TastingNotes';

const TastingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <TastingNotes />
    </div>
  );
};

export default TastingPage;