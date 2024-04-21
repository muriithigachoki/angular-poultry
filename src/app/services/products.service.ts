import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly apiUrl = 'https://lit-beach-77859-33f6c1570728.herokuapp.com/api/';

  constructor(private http: HttpClient) {}

  getHomePageImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'home/');
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'products/');
  }

  getcategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'category/');
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}products/${productId}`);
  }

  getProductsByCategory(category: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}products/${category}`);
  }
}
