import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl =
    'https://lit-beach-77859-33f6c1570728.herokuapp.com/api/orders/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  token = sessionStorage.getItem('token');

  headers = new HttpHeaders({
    Authorization: `Token ${this.token}`,
  });

  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData, {
      headers: this.headers,
    });
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: this.headers,
    });
  }

  getOrdersById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + id, {
      headers: this.headers,
    });
  }
}
