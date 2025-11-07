import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Product {
    id?: number | string;
    name?: string;
    price?: number;
    category?: string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = 'http://localhost:8080/products';

    constructor(private http: HttpClient) { }

    /**
     * Obtiene productos desde la API. Devuelve siempre un Product[] (mappea { payload: Product[] } o la respuesta directa).
     */
    getProducts(category?: string, sort?: string): Observable<Product[]> {
        let params = new HttpParams();

        if (category && category !== '') {
            // nombre del parámetro de consulta: si la API usa otro nombre cámbialo aquí
            params = params.set('query', category);
        }

        if (sort && sort !== '') {
            params = params.set('sort', sort);
        }

        return this.http.get<any>(this.apiUrl, { params: params }).pipe(
            map((res: any) => {
                // si la API responde { payload: [...] } lo mapeamos, sino asumimos que la respuesta es el array
                if (res == null) return [] as Product[];
                return Array.isArray(res) ? res as Product[] : (res.payload ? res.payload as Product[] : (res.data ? res.data as Product[] : []));
            }),
            catchError((err) => {
                console.error('Error cargando productos', err);
                // en caso de error devolvemos lista vacía para evitar romper el UI; podes cambiar a throwError si prefieres propagar
                return of([] as Product[]);
            })
        );
    }
}