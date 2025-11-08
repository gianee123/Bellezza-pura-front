import { Routes } from '@angular/router';
import { FilteringListComponent } from './filtering-list/filtering-list-component';
import { FilteringDetailComponent } from './filtering-detail/filtering-detail-component';

export const routes: Routes = [
	{ path: '', redirectTo: 'filtering', pathMatch: 'full' },
	{ path: 'filtering', component: FilteringListComponent },
	{ path: 'filtering/:id', component: FilteringDetailComponent },
	{ path: '**', redirectTo: 'filtering' }
];
