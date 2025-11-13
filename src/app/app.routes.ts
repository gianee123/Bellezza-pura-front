import { Routes } from '@angular/router';
import { FilteringDetailComponent } from './filtering-detail/filtering-detail-component.js';
import { FilteringListComponent } from './filtering-list/filtering-list-component.js';

import { CartComponent } from './cart-list/cart-list.js';
import { ProductFormComponent } from './product-form/product-form-component.js';
import { ProductListComponent } from './product-list/product-list-component.js';

export const routes: Routes = [
	{path : 'home', component : ProductListComponent},
	{ path: 'filtering', component: FilteringListComponent },

	{ path: 'filtering/:id', component: FilteringDetailComponent },
	{ path: '**', redirectTo: 'filtering' },
	{ path : 'cart', component : CartComponent},
	{ path : 'products', component : ProductListComponent},
	{ path: 'products/new', component: ProductFormComponent, title: 'Registrar Producto'},

	{ path: '**', redirectTo: 'products' }

];












