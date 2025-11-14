import { Routes } from '@angular/router';
import { FilteringDetailComponent } from './filtering-detail/filtering-detail-component.js';
import { FilteringListComponent } from './filtering-list/filtering-list-component.js';

import { CartComponent } from './cart-list/cart-list.js';
import { OrderComponent } from './order-list/order-list.js';
import { ProductFormComponent } from './product-form/product-form-component.js';
import { ProductListComponent } from './product-list/product-list-component.js';
import { ProductDetailComponent } from './product-detail/product-detail-component';

export const routes: Routes = [

	{path : 'home', component : ProductListComponent},
	{ path : 'products', component : ProductListComponent},
    {path: 'products/:id', component: ProductDetailComponent, title: 'Detalle del Producto' },
	{ path: 'products/new', component: ProductFormComponent, title: 'Registrar Producto'},
	{ path: 'products/edit/:id', component: ProductFormComponent, title: 'Editar Producto' },

	{ path: 'filtering', component: FilteringListComponent },
	{ path: 'filtering/:id', component: FilteringDetailComponent },

	{path: 'orders', component: OrderComponent},
	
	{ path : 'cart', component : CartComponent},

	{ path: '**', redirectTo: 'products' }

];












