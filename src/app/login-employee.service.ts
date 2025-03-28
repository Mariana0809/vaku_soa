import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciales } from './component/login-employee/credencialesEmployee';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginEmployeeService {
  private urlBase = 'http://localhost:8080/auth/login';

  constructor(private ClienteHttp: HttpClient) {}

  login(credenciales: Credenciales): Observable<AuthResponse> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    return this.ClienteHttp.post<AuthResponse>(this.urlBase, credenciales, { headers });
  }
}