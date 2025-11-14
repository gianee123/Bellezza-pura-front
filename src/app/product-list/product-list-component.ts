import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../shared/product-service';
import { Product } from '../shared/product-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../shared/cart-service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [MatButtonModule, MatInputModule,MatIconModule,MatCardModule,RouterModule,CommonModule],
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list-component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private routerSubscription: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(() => {
        this.loadProducts(); 
    });
    
    this.loadProducts(); 
  }

  ngOnDestroy(): void {
      // desuscribir para evitar fugas de memoria
      this.routerSubscription?.unsubscribe();
  }
  
  //metodo para cargar productos
  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log('data recibida y forzada:', data);
      this.products = data;
    });
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p._id !== id);
      });
    }
  }

  addToCart(product: Product): void { 
    this.cartService.addToCart(product);
    console.log('Producto agregado al carrito:', product);
  }
}
