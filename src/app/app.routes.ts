import { Routes } from '@angular/router';
import { ProductFilterComponent } from './features/product-filter.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'products', pathMatch: 'full' },
	{ path: 'products', component: ProductFilterComponent }
];
