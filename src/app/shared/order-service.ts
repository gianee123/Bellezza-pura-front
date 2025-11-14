
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Order } from './order-interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api';
 
  constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.apiUrl}/orders/all`).pipe(
        
      );
    }

    createOrder(order: Omit<Order, '_id'>): Observable<Order> {
   
    const createUrl = `${this.apiUrl}/orders/create`; 
    
    return this.http.post<Order>(createUrl, order).pipe( 
        
    );
    }

   remove(orderId: string): Observable<{ message: string }> {
   const removeUrl = `${this.apiUrl}/orders/delete/${orderId}`;
   return this.http.delete<{ message: string }>(removeUrl);
  }

    getTotal() {
      return this.http.get<{ total: number }>(`${this.apiUrl}/cart/total`).pipe(
        map(response => response.total)
      );
    }

}