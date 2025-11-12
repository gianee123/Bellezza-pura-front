/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-filtering-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './filtering-detail-component.html',
    styleUrls: ['./filtering-detail-component.css']
})
export class FilteringDetailComponent implements OnInit {
    product: Product | null = null;
    loading = false;
    id: string | null = null;

    constructor(private route: ActivatedRoute, private productService: ProductService) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.loading = true;
            this.productService.getProductById(this.id).subscribe((p) => {
                this.product = p;
                this.loading = false;
            });
        }
    }
}*/