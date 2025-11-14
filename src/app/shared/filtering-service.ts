import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FilteringProduct } from './filtering-interface';

@Injectable({
    providedIn: 'root'
})
export class FilteringService {

  private apiUrl = 'http://localhost:3000/api/filtering'; //

    constructor(private http: HttpClient) { }

    /**
   * Método para obtener productos
   * Llama a /filter o /findAll según corresponda.
   */
    getProducts(category?: string): Observable<FilteringProduct[]> {
    let params = new HttpParams();
    let url = this.apiUrl;

    if (category && category !== '') {
      // Tu backend espera 'category'
        params = params.set('category', category);
      url += '/filter'; //
    } else {
      url += '/findAll'; //
    }
    
    //devuelve un array directamente
    return this.http.get<FilteringProduct[]>(url, { params: params }).pipe(
        catchError((err) => {
        console.error('Error cargando productos de filtering', err);
        return of([] as FilteringProduct[]);
        })
    );
}

    /**
   *Método para obtener un producto (para tu filtering-detail).
   */
    getProductById(id: string | number): Observable<FilteringProduct | null> {
    const url = `${this.apiUrl}/${id}`; //
    
    return this.http.get<FilteringProduct>(url).pipe(
        catchError((err) => {
        console.error('Error cargando producto por id', err);
        return of(null);
        })
    );
    }
}