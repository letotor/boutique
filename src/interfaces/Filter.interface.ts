export type Category = "all" | "laptop" | "desktop" | "accessories";

export interface FilterInterface {
  search: string;
  priceRange: [number, number];
  category: Category 
  ;
}
