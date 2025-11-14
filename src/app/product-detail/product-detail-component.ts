import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../shared/product-service';
import { Product } from '../shared/product-interface';
import { Observable, switchMap, of } from 'rxjs'; 
import { CartService } from '../shared/cart-service';


import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-detail',
  standalone: true, 
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-detail-component.html',
  styleUrls: ['./product-detail-component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined> | undefined; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService 
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        
        if (!productId) {
          return of(undefined);
        }
        return this.productService.getProduct(productId);
      })
    );
  }

  // Método para manejar la adición al carrito
  addToCart(product: Product): void {
    console.log(`Producto ${product.name} agregado al carrito.`);
    alert(`Se agregó ${product.name} al carrito (simulación).`);
  }
}