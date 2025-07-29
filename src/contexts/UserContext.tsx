import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserInteractions, TastingNote } from '../types/whiskey';

// Data validation functions
const isValidWhiskeyId = (id: any): id is string => {
  return typeof id === 'string' && id.length > 0 && /^[a-zA-Z0-9_-]+$/.test(id);
};

const isValidTastingNote = (note: any): note is TastingNote => {
  return (
    typeof note === 'object' &&
    note !== null &&
    typeof note.id === 'string' &&
    typeof note.whiskeyId === 'string' &&
    typeof note.rating === 'number' &&
    note.rating >= 1 &&
    note.rating <= 5 &&
    typeof note.notes === 'string' &&
    note.notes.length >= 5 &&
    note.notes.length <= 2000 &&
    (note.dateCreated instanceof Date || typeof note.dateCreated === 'string') &&
    (note.tastingConditions === undefined || (typeof note.tastingConditions === 'string' && note.tastingConditions.length <= 500)) &&
    (note.aromaRating === undefined || (typeof note.aromaRating === 'number' && note.aromaRating >= 1 && note.aromaRating <= 5)) &&
    (note.tasteRating === undefined || (typeof note.tasteRating === 'number' && note.tasteRating >= 1 && note.tasteRating <= 5)) &&
    (note.finishRating === undefined || (typeof note.finishRating === 'number' && note.finishRating >= 1 && note.finishRating <= 5))
  );
};

const sanitizeUserData = (data: any): UserInteractions => {
  const defaultData: UserInteractions = {
    savedWhiskies: [],
    tastingNotes: []
  };

  if (!data || typeof data !== 'object') {
    return defaultData;
  }

  // Validate and sanitize saved whiskies
  const savedWhiskies = Array.isArray(data.savedWhiskies) 
    ? data.savedWhiskies.filter(isValidWhiskeyId)
    : [];

  // Validate and sanitize tasting notes
  const tastingNotes = Array.isArray(data.tastingNotes)
    ? data.tastingNotes
        .filter(isValidTastingNote)
        .map((note: any) => ({
          ...note,
          dateCreated: note.dateCreated instanceof Date ? note.dateCreated : new Date(note.dateCreated),
          notes: note.notes.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim(),
          tastingConditions: note.tastingConditions 
            ? note.tastingConditions.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim()
            : undefined
        }))
    : [];

  return {
    savedWhiskies,
    tastingNotes
  };
};

interface UserContextType {
  userInteractions: UserInteractions;
  addToSaved: (whiskeyId: string) => void;
  removeFromSaved: (whiskeyId: string) => void;
  isWhiskeySaved: (whiskeyId: string) => boolean;
  addTastingNote: (note: TastingNote) => void;
  updateTastingNote: (noteId: string, updatedNote: Partial<TastingNote>) => void;
  removeTastingNote: (noteId: string) => void;
  getTastingNotesByWhiskey: (whiskeyId: string) => TastingNote[];
  hasUserTasted: (whiskeyId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInteractions, setUserInteractions] = useState<UserInteractions>({
    savedWhiskies: [],
    tastingNotes: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('whiskeyUserData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const sanitizedData = sanitizeUserData(parsedData);
        setUserInteractions(sanitizedData);
      }
    } catch (error) {
      console.error('Failed to load user data from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('whiskeyUserData');
    }
  }, []);

  // Save data to localStorage whenever userInteractions changes
  useEffect(() => {
    try {
      localStorage.setItem('whiskeyUserData', JSON.stringify(userInteractions));
    } catch (error) {
      console.error('Failed to save user data to localStorage:', error);
    }
  }, [userInteractions]);

  const addToSaved = (whiskeyId: string) => {
    if (!isValidWhiskeyId(whiskeyId)) {
      console.error('Invalid whiskey ID provided to addToSaved:', whiskeyId);
      return;
    }
    
    setUserInteractions(prev => ({
      ...prev,
      savedWhiskies: [...prev.savedWhiskies, whiskeyId]
    }));
  };

  const removeFromSaved = (whiskeyId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      savedWhiskies: prev.savedWhiskies.filter(id => id !== whiskeyId)
    }));
  };

  const isWhiskeySaved = (whiskeyId: string) => {
    return userInteractions.savedWhiskies.includes(whiskeyId);
  };

  const addTastingNote = (note: TastingNote) => {
    if (!isValidTastingNote(note)) {
      console.error('Invalid tasting note provided to addTastingNote:', note);
      return;
    }
    
    setUserInteractions(prev => ({
      ...prev,
      tastingNotes: [...prev.tastingNotes, note]
    }));
  };

  const updateTastingNote = (noteId: string, updatedNote: Partial<TastingNote>) => {
    setUserInteractions(prev => ({
      ...prev,
      tastingNotes: prev.tastingNotes.map(note => 
        note.id === noteId ? { ...note, ...updatedNote } : note
      )
    }));
  };

  const removeTastingNote = (noteId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      tastingNotes: prev.tastingNotes.filter(note => note.id !== noteId)
    }));
  };

  const getTastingNotesByWhiskey = (whiskeyId: string) => {
    return userInteractions.tastingNotes.filter(note => note.whiskeyId === whiskeyId);
  };

  const hasUserTasted = (whiskeyId: string) => {
    return userInteractions.tastingNotes.some(note => note.whiskeyId === whiskeyId);
  };

  const value: UserContextType = {
    userInteractions,
    addToSaved,
    removeFromSaved,
    isWhiskeySaved,
    addTastingNote,
    updateTastingNote,
    removeTastingNote,
    getTastingNotesByWhiskey,
    hasUserTasted
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};