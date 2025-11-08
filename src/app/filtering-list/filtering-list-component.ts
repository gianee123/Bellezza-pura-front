import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-filtering-list',
	templateUrl: './filtering-list-component.html',
	styleUrls: ['./filtering-list-component.css'],
	standalone: true,
	imports: [CommonModule, RouterModule, FormsModule],
})
export class FilteringListComponent implements OnInit {
searchTerm: any;
loading: any;
error: any;
products: any;
onSearchChange($event: any) {
throw new Error('Method not implemented.');
}
p: any;
	constructor() {}
	ngOnInit(): void {}
}
