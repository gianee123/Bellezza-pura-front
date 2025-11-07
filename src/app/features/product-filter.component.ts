import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Product, ProductService } from '../services/product.service';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class ProductFilterComponent implements OnInit {

    products: Product[] = [];

    selectedCategory: string = '';
    selectedSort: string = '';

    loading: boolean = false;
    errorMessage: string | null = null;

    private filterSubject = new Subject<void>();

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.filterSubject.pipe(
            debounceTime(300),
            switchMap(() => {
                this.loading = true;
                this.errorMessage = null;
                return this.productService.getProducts(this.selectedCategory, this.selectedSort);
            })
        ).subscribe({
            next: (products: Product[]) => {
                this.products = products;
                this.loading = false;
                console.log('Productos actualizados:', this.products);
            },
            error: (err) => {
                this.loading = false;
                this.errorMessage = 'Error cargando productos';
                console.error(err);
            }
        });

        // trigger inicial
        this.filterSubject.next();
    }

    applyFilters(): void {
        this.filterSubject.next();
    }

    onCategoryChange(event: Event): void {
        this.selectedCategory = (event.target as HTMLSelectElement).value;
        this.applyFilters();
    }

    onSortChange(event: Event): void {
        this.selectedSort = (event.target as HTMLSelectElement).value;
        this.applyFilters();
    }
}