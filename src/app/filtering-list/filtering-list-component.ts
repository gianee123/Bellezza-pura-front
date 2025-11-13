import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductService } from '../services/product.service';
//import {CartService} from '../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../models/product.model';

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
clearFilters() {
throw new Error('Method not implemented.');
}
addToCart(_t38: Product) {
throw new Error('Method not implemented.');
}

	selectedCategory: string = '';
	searchTerm: string = '';
	categories: string[] = ['Maquillaje', 'Skincare', 'Cuidado del cabello'];

	private allProducts: Product[] = [];
	filteredProducts: Product[] = [];

	loading: boolean = false;
	error: string | null = null;

	constructor(
		private productService: ProductService,
//		private cartService: CartService
	){}

	ngOnInit(): void {
		this.loadProductsByCategory();
	}
	loadProductsByCategory(): void {
		this.loading = true;
		this.error = null;

		(
			this.productService.getProducts(this.selectedCategory) as unknown as Observable<Product[]>
		).subscribe({
			next: (data: Product[]) => {
				this.allProducts = data;
				this.applyTextFilter();
				this.loading = false;
			},
			error: (err) => {
				this.error = 'No se pudieron cargar los productos.';
				this.loading = false;
				}
		});
	}
	applyTextFilter() {
		if (!this.searchTerm) {
			this.filteredProducts = [...this.allProducts];
		} else {
			this.filteredProducts = this.allProducts.filter((p) =>
				p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
			);
		}
	}

ClearFilters(): void {
	this.searchTerm = '';
	this.selectedCategory = '';
	
	this.loadProductsByCategory();
	}
}

function applyTextFilter() {
	throw new Error('Function not implemented.');
}

/*addToCart(product: Product): void {
		this.cartService.addToCart(product);
		console.log("Producto añadido", product.name)
		throw new Error ('Method not implemented.');
	}
}
*/