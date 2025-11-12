import { Routes } from '@angular/router';
import { FilteringListComponent } from './filtering-list/filtering-list-component';
//import { FilteringDetailComponent } from './filtering-detail/filtering-detail-component';
import {CartComponent} from './cart-list/cart-list';
import {ProductListComponent} from './product-list/product-list-component';


export const routes: Routes = [
	//{path : 'home', component : ProductListComponent},
	{ path: 'filtering', component: FilteringListComponent },
	//{ path: 'filtering/:id', component: FilteringDetailComponent },
	//{ path: '**', redirectTo: 'filtering' },
	{path : 'cart', component : CartComponent}, 
	{path : 'product', component : ProductListComponent}


];












