import type { Product } from "./Product.interface";

export interface ProductCart extends Product {
    quantity: number;
}

    