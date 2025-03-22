import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciales } from './component/login-employee/credencialesEmployee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginEmployeeService {
  private urlBase = 'http://localhost:8080/auth/login';

  constructor(private ClienteHttp: HttpClient) {}

  login(credenciales: Credenciales): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    return this.ClienteHttp.post(this.urlBase, credenciales, { headers });
  }
}
