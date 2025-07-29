import { CannabisProduct } from '../types/whiskey';
import { indicaStrains, sativaStrains, hybridStrains, cbdStrains, concentrates, edibles, preRolls } from './cannabis';

export const cannabisCollection: CannabisProduct[] = [
  ...indicaStrains,
  ...sativaStrains,
  ...hybridStrains,
  ...cbdStrains,
  ...concentrates,
  ...edibles,
  ...preRolls
];

// Compatibility export
export const whiskeyCollection = cannabisCollection;

// Export individual collections for specific use cases
export { indicaStrains, sativaStrains, hybridStrains, cbdStrains, concentrates, edibles, preRolls };