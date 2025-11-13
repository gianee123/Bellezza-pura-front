import { Routes } from '@angular/router';
import { FilteringListComponent } from './filtering-list/filtering-list-component';
//import { FilteringDetailComponent } from './filtering-detail/filtering-detail-component';
import {CartComponent} from './cart-list/cart-list';
import {ProductListComponent} from './product-list/product-list-component';
import { ProductFormComponent } from './product-form/product-form-component';

export const routes: Routes = [
	{path : 'home', component : ProductListComponent},
	{ path: 'filtering', component: FilteringListComponent },
	//{ path: 'filtering/:id', component: FilteringDetailComponent },
	//{ path: '**', redirectTo: 'filtering' },
	{path : 'cart', component : CartComponent}, 
	{path : 'products', component : ProductListComponent},
	{path: 'products/new', component: ProductFormComponent, title: 'Registrar Producto'},

	{ path: '**', redirectTo: 'products' }

];












