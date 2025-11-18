import { CannabisProduct } from '@/types/whiskey';

export type PriceStructure = number | {
  '3.5g': number;
  '7g': number;
  '14g': number;
  'ounce': number;
};

export const isTieredPrice = (price: PriceStructure): price is { '3.5g': number; '7g': number; '14g': number; 'ounce': number } => {
  return typeof price === 'object';
};

export const getBasePrice = (price: PriceStructure): number => {
  if (isTieredPrice(price)) {
    return price['3.5g'];
  }
  return price;
};

export const getDisplayPrice = (price: PriceStructure): string => {
  if (isTieredPrice(price)) {
    return `$${price['3.5g'].toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
};

export const getPriceForComparison = (price: PriceStructure): number => {
  return getBasePrice(price);
};
