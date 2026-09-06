import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


import { LoginRequest,  LoginResponse,  RegisterRequest } from '../Models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5086/api/Auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(`${this.baseUrl}/LoginUser`, request)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.data.token);

          localStorage.setItem('role', response.data.role);
       
        })
      );
  }

  register(request: RegisterRequest): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/RegisterUser`,
      request
    );
  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
   
  }

  getToken(): string | null {

    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
  }

  // getUserName(): string | null {

  //   return localStorage.getItem('name');
  // }

  // getUserEmail(): string | null {

  //   return localStorage.getItem('email');
  // }
}