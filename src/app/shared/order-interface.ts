import { Product } from './product-interface';

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  date: Date;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}
