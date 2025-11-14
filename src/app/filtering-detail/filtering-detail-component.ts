import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatIcon } from "@angular/material/icon";
import { FilteringProduct as Product } from '../shared/filtering-interface'; // Usamos 'as Product' para no cambiar el resto del código
import { FilteringService } from '../shared/filtering-service';
@Component({
    selector: 'app-filtering-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, MatIcon],
    templateUrl: './filtering-detail-component.html',
    styleUrls: ['./filtering-detail-component.css']
})

export class FilteringDetailComponent implements OnInit {
    product: Product | null = null;
    loading = false;
    id: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private productService: FilteringService
    ) {}

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
}