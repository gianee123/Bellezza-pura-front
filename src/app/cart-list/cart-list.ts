import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart-service';
import { Product } from '../shared/product-interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { OrderService } from '../shared/order-service';


@Component({
  selector: 'app-cart',
  imports: [MatButtonModule, MatInputModule,MatIconModule,MatCardModule,RouterModule,CommonModule],
  templateUrl: './cart-list.html',
  styleUrls: ['./cart-list.css']
})
export class CartComponent implements OnInit {
  cartItems: (Product & { quantity: number })[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService
) {}

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

createOrder(): void {
  
  const items = this.cartItems.map(item => ({
    product: {
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      stock: item.stock,
      image: item.image
    },
    quantity: item.quantity,
    subtotal: item.price * item.quantity
  }));
  
  const pedido = {
    items,
    total: this.total,       
    date: new Date()       
  };
  alert('Pedido realizado con éxito por un total de $' + pedido.total + ' pesos. Gracias por confiar en Bellezza Pura!');

  this.orderService.createOrder(pedido).subscribe({
    next: res => console.log("Pedido creado", res),
    error: err => console.error(" Error backend", err)
  });
}

}
