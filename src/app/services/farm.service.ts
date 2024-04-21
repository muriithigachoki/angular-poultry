import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  readonly APiUrls = 'https://lit-beach-77859-33f6c1570728.herokuapp.com/api/';

  token = sessionStorage.getItem('token');

  headers = new HttpHeaders({
    Authorization: `Token ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  createFarms(farm: any): Observable<any> {
    return this.http.post<any>(this.APiUrls + 'farm/', farm, {
      headers: this.headers,
    });
  }

  getFarms(): Observable<any> {
    return this.http.get(this.APiUrls + 'farm/', { headers: this.headers });
  }

  getFarmById(id: any): Observable<any> {
    return this.http.get(this.APiUrls + 'farm/' + id, {
      headers: this.headers,
    });
  }

  addIncomes(income: any): Observable<any> {
    return this.http.post<any>(this.APiUrls + 'farm/incomes/', income, {
      headers: this.headers,
    });
  }
  addExpenses(income: any): Observable<any> {
    return this.http.post<any>(this.APiUrls + 'farm/expense/', income, {
      headers: this.headers,
    });
  }

  getIncomesById(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.APiUrls + 'farm/incomes/' + id + '/', {
      headers: this.headers,
    });
  }
  getIncomes(farmId?: number): Observable<any[]> {
    return this.http.get<any[]>(this.APiUrls + 'farm/incomes/?farmId=', {
      headers: this.headers,
    });
  }
  getExpensesById(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.APiUrls + 'farm/expense/' + id + '/', {
      headers: this.headers,
    });
  }
  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(this.APiUrls + 'farm/expense/', {
      headers: this.headers,
    });
  }
  deleteExpense(id: any): Observable<any[]> {
    return this.http.delete<any[]>(this.APiUrls + 'farm/expense/' + id + '/', {
      headers: this.headers,
    });
  }

  deleteIncome(id: any): Observable<any[]> {
    return this.http.delete<any[]>(this.APiUrls + 'farm/incomes/' + id + '/');
  }

  updateExpense(id: any, expense: any): Observable<any> {
    return this.http.put(this.APiUrls + 'farm/expense/' + id + '/', expense, {
      headers: this.headers,
    });
  }

  updateIncome(id: any, incomes: any): Observable<any> {
    return this.http.put(this.APiUrls + 'farm/incomes/' + id + '/', incomes, {
      headers: this.headers,
    });
  }
  updateFarm(id: any, farm: any): Observable<any> {
    return this.http.put(this.APiUrls + 'farm/' + id + '/', farm, {
      headers: this.headers,
    });
  }

  dayOldOrder(chicksOrderForm: any) {
    return this.http.post(
      `${this.APiUrls}day-old-chicks/orders/`,
      chicksOrderForm
    );
  }
}
