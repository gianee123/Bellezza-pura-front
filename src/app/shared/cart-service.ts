import { Injectable } from '@angular/core';
import { Product } from './product-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: (Product & { quantity: number })[] = [];

  addToCart(product: Product) {
    const existing = this.items.find(item => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    console.log('Carrito:', this.items);
  }

  removeFromCart(productId: string) {
    this.items = this.items.filter(item => item._id !== productId);
  }

  changeQuantity(productId: string, cantidad: number) {
    const item = this.items.find(i => i._id === productId);
    if (item) {
      item.quantity = cantidad;
      if (item.quantity <= 0) this.removeFromCart(productId);
    }
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.items = [];
  }
}
