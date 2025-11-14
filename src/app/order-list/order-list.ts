import { Component } from '@angular/core';
import { OrderService } from '../shared/order-service';
import { Order } from '../shared/order-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderComponent {


  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        console.log(" Lo que devuelve el back:", response);

        this.orders = Array.isArray(response) ? response : [];
      },

      error: (err) => {
        console.error(" Error al obtener pedidos:", err);
        this.orders = []; 
      }
      
    });
  }

  removeOrder(orderId: string): void {
    this.orderService.remove(orderId).subscribe({
      next: (response) => {
        console.log('Pedido eliminado:', response);
        this.orders = this.orders.filter(order => order._id !== orderId);
      },
      error: (err) => {
        console.error('Error al eliminar el pedido:', err);
      }
    });
}
}