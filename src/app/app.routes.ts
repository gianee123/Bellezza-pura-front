import { Routes } from '@angular/router';
import { FilteringDetailComponent } from './filtering-detail/filtering-detail-component.js';
import { FilteringListComponent } from './filtering-list/filtering-list-component.js';

import { CartComponent } from './cart-list/cart-list.js';
import { ProductFormComponent } from './product-form/product-form-component.js';
import { ProductListComponent } from './product-list/product-list-component.js';
import { ProductDetailComponent } from './product-detail/product-detail-component';

export const routes: Routes = [

	{ path: 'filtering', component: FilteringListComponent },
	{ path: 'filtering/:id', component: FilteringDetailComponent },
	{ path : 'cart', component : CartComponent},

	{ path: 'products/new', component: ProductFormComponent, title: 'Registrar Producto'},
	{ path: 'products/edit/:id', component: ProductFormComponent, title: 'Editar Producto' },
	{ // Aquí, ':id' es el nombre que usas para capturar el valor (que debe coincidir con params.get('id') en tu componente TS)
    path: 'products/:id', component: ProductDetailComponent, title: 'Detalle del Producto' },
  	{ path : 'products', component : ProductListComponent},
		{path : 'home', component : ProductListComponent},
	{ path: '**', redirectTo: 'products' }

];












