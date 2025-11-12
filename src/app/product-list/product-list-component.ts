import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product-service';
import { Product } from '../shared/product-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../shared/cart-service'; 

@Component({
  selector: 'app-product-list',
  imports: [MatButtonModule, MatInputModule,MatIconModule,MatCardModule,RouterModule,CommonModule],
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list-component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit se ejecuta');
    this.productService.getProducts().subscribe((data) => {
      console.log('data recibida:', data);
      this.products = data;
    });
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás segura de eliminar este producto?')) {
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
