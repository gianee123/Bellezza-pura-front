import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = 'http://localhost:8080/products';

    constructor(private http: HttpClient) { }

    getProducts(category?: string, sort?: string): Observable<Product[]> {
        let params = new HttpParams();

        if (category && category !== '') {
            params = params.set('query', category);
        }

        if (sort && sort !== '') {
            params = params.set('sort', sort);
        }

        return this.http.get<any>(this.apiUrl, { params: params }).pipe(
            map((res: any) => {
                if (res == null) return [] as Product[];
                return Array.isArray(res) ? res as Product[] : (res.payload ? res.payload as Product[] : (res.data ? res.data as Product[] : []));
            }),
            catchError((err) => {
                console.error('Error cargando productos', err);
                return of([] as Product[]);
            })
        );
    }

    getProductById(id: string | number): Observable<Product | null> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url).pipe(
            map((res: any) => {
                if (!res) return null;
                if (res.id || res.name) return res as Product;
                if (res.payload) return res.payload as Product;
                if (res.data) return res.data as Product;
                return null;
            }),
            catchError((err) => {
                console.error('Error cargando producto por id', err);
                return of(null);
            })
        );
    }
}