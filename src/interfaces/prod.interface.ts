export interface ProdInterface {
  id: number | null;
  title: string | null;
  price: number | null;
  description: string | null;
  category: string | null;
  image: string | null | undefined;
  rating?: { rate: number | null; count: number | null };
}
