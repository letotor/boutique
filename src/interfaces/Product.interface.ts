export type Category = 'all' | 'laptop' | 'desktop' | 'accessories';
export interface ProductInterface {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Category;
}
