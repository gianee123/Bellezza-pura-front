import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  private apiUrlSingular = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<{ data: Product[] }>(`${this.apiUrl}/getAll`).pipe(
      map(response => response.data)
    );
  }
  //obtener un producto por ID, al tener data y en nuestro back no, lo ajustamos,
  // deberiamos modificar el back, esto fue una solucion rapida
getProduct(id: string): Observable<Product> {
  // El objeto es Product directamente (NO { data: Product })
  return this.http.get<Product>(`${this.apiUrl}/${id}`); 
  // Esto requiere eliminar el .pipe(map(response => response.data)) de esta función
}
 /* // Obtener un producto por ID
  getProduct(id: string): Observable<Product> {
    return this.http.get<{ data: Product }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }*/

// Agregar un nuevo producto (CREATE)
addProduct(product: Omit<Product, '_id'>): Observable<Product> {

    const createUrl = `${this.apiUrl}/create`; 
    
    return this.http.post<{ data: Product }>(createUrl, product).pipe( // Usamos la URL corregida
        map(response => response.data)
    );
}

  // Editar producto existente
  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<{ data: Product }>(`${this.apiUrl}/${id}`, product).pipe(
      map(response => response.data)
    );
  }

  // Eliminar producto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
