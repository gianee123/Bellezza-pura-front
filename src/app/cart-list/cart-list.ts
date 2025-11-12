import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart-service';
import { Product } from '../shared/product-interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule,CommonModule,RouterModule],
  templateUrl: './cart-list.html',
  styleUrls: ['./cart-list.css']
})
export class CartComponent implements OnInit {
  cartItems: (Product & { quantity: number })[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  increaseQuantity(item: Product & { quantity: number }) {
    this.cartService.changeQuantity(item._id, item.quantity + 1);
    this.loadCart();
  }

  decreaseQuantity(item: Product & { quantity: number }) {
    this.cartService.changeQuantity(item._id, item.quantity - 1);
    this.loadCart();
  }

  removeItem(item: Product & { quantity: number }) {
    this.cartService.removeFromCart(item._id);
    this.loadCart();
  }

  checkout() {
    alert('Compra realizada por $' + this.total);
    this.cartService.clearCart();
    this.loadCart();
  }
}
