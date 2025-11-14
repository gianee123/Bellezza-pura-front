import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CartService } from '../shared/cart-service';
import { FilteringProduct as Product } from '../shared/filtering-interface'; // Usamos 'as Product' para no cambiar el resto del código
import { FilteringService } from '../shared/filtering-service';

@Component({
	selector: 'app-filtering-list',
	templateUrl: './filtering-list-component.html',
	styleUrls: ['./filtering-list-component.css'],
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
	],
})

export class FilteringListComponent implements OnInit {
clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.applyFilter();
	}
addToCart(product: Product) {
this.cartService.addToCart(product);
    console.log('Producto agregado:', product.name);
	}

selectedCategory: string = '';
searchTerm: string = '';
categories: string[] = ['Maquillaje', 'Skincare', 'Cuidado del cabello'];

private allProducts: Product[] = [];
filteredProducts: Product[] = [];

loading: boolean = false;
error: string | null = null;

constructor (private productService: FilteringService,
		private cartService: CartService
	) {}

ngOnInit(): void {
	this.loadAllProducts();
}
loadAllProducts(): void {
	this.loading = true;
    this.error = null;

	(
		this.productService.getProducts(this.selectedCategory) as unknown as Observable<Product[]>
	).subscribe({
		next: (data: Product[]) => {
			this.allProducts = data;
			this.applyFilter();
			this.loading = false;
		},
		error: (err) => {
			this.error = 'No se pudieron cargar los productos.';
			this.loading = false;
		}
	});
}

applyFilter() {
	let tempProducts = [...this.allProducts];
// 1. Filtrar por categoría
    if (this.selectedCategory) {
		tempProducts = tempProducts.filter(
        (p) => p.category === this.selectedCategory
		);
    }

// Filtrar por término de búsqueda (Nombre)
    if (this.searchTerm) {
		tempProducts = tempProducts.filter((p) =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
	);
}
    this.filteredProducts = tempProducts;
	}
}