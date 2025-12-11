import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return of([
      {
        id: '1',
        name: 'Product A',
        description: 'Description A',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]).pipe(delay(500));
  }

  getProduct(id: string): Observable<Product> {
    return of({
      id,
      name: 'Product A',
      description: 'Description A',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).pipe(delay(500));
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return of({ id: '1', ...product } as Product).pipe(delay(500));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return of({ id, ...product } as Product).pipe(delay(500));
  }

  deleteProduct(id: string): Observable<void> {
    return of(void 0).pipe(delay(500));
  }
}
