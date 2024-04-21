import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../cart';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = 'https://lit-beach-77859-33f6c1570728.herokuapp.com/api/';

  token = sessionStorage.getItem('token');

  headers = new HttpHeaders({
    Authorization: `Token ${this.token}`,
  });

  constructor(private http: HttpClient, private authService: AuthService) {}

  user = this.authService.isTheOwner();

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl + 'cartitems/', {
      headers: this.headers,
    });
  }

  addToCart(product: Product): Observable<any> {
    return this.http.post<any>(
      this.cartUrl + 'cartitems/',
      {
        user: this.user,
        product: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        description: product.description,
      },
      { headers: this.headers }
    );
  }

  removeCartItem(id: any): Observable<any> {
    return this.http.delete<any>(this.cartUrl + 'cartitems/' + id + '/', {
      headers: this.headers,
    });
  }

  updateCartItemQuantity(
    user: number,
    cartItemId: number,
    name: string,
    product: number,
    price: number,
    quantity: number
  ): Observable<any> {
    return this.http.put<any>(
      this.cartUrl + 'cartitems/' + cartItemId + '/',
      {
        user,
        name,
        product,
        price,
        quantity,
      },
      { headers: this.headers }
    );
  }
}
