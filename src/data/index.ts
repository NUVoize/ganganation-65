import { CannabisProduct } from '../types/whiskey';
import { indicaStrains, sativaStrains, hybridStrains, cbdStrains, concentrates, edibles, preRolls, mushroomProducts, hashProducts, edibleProducts, waxProducts } from './cannabis';
import { rollingPapers } from './rollingPapers';

export const cannabisCollection: CannabisProduct[] = [
  ...indicaStrains,
  ...sativaStrains,
  ...hybridStrains,
  ...cbdStrains,
  ...concentrates,
  ...edibles,
  ...preRolls,
  ...mushroomProducts,
  ...hashProducts,
  ...edibleProducts,
  ...rollingPapers,
  ...waxProducts
];

// Compatibility export
export const whiskeyCollection = cannabisCollection;

// Export individual collections for specific use cases
export { indicaStrains, sativaStrains, hybridStrains, cbdStrains, concentrates, edibles, preRolls, mushroomProducts, hashProducts, edibleProducts, rollingPapers, waxProducts };