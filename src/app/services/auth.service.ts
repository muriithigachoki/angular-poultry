import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://lit-beach-77859-33f6c1570728.herokuapp.com/api/';

  token = sessionStorage.getItem('token');

  headers = new HttpHeaders({
    Authorization: `Token ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/register/`, userData);
  }

  updateUser(id: any, userData: any): Observable<any> {
    return this.http.put(this.baseUrl + 'auth/users/' + id + '/', userData, {
      headers: this.headers,
    });
  }

  deleteUser(id: any) {
    return this.http.delete(this.baseUrl + 'auth/users/' + id, {
      headers: this.headers,
    });
  }

  loginUser(userData: any) {
    return this.http.post(`${this.baseUrl}auth/login/`, userData);
  }

  logout() {
    sessionStorage.clear();
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'auth/users', {
      headers: this.headers,
    });
  }

  getUserById(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'auth/users/' + id + '/', {
      headers: this.headers,
    });
  }

  getUserRole() {
    return sessionStorage.getItem('issuperuser') != null
      ? sessionStorage.getItem('issuperuser')?.toString()
      : '';
  }

  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }

  isTheOwner() {
    return sessionStorage.getItem('id');
  }
}

export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
