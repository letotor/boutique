export interface Filter {
  search: string;
  priceRange: [number, number];
  category: "all" | "laptop" | "desktop" | "accessories";
}

export interface FilterUpdate {
  search?: string;
  priceRange?: [number, number];
  category?: "all" | "laptop" | "desktop" | "accessories";
}