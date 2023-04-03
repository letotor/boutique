import { FiltersInterface } from '../interfaces/Filter.interface';

export const DEFAULT_FILTERS: FiltersInterface = {
  search: '',
  priceRange: [0, 10000],
  category: 'all',
};
