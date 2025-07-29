import { WhiskeyProduct } from '../types/whiskey';
import { scotchWhiskies } from './scotch';
import { bourbonWhiskies } from './bourbon';
import { irishWhiskies } from './irish';
import { canadianWhiskies } from './canadian';

export const whiskeyCollection: WhiskeyProduct[] = [
  ...scotchWhiskies,
  ...bourbonWhiskies,
  ...irishWhiskies,
  ...canadianWhiskies
];

// Export individual collections for specific use cases
export { scotchWhiskies, bourbonWhiskies, irishWhiskies, canadianWhiskies };