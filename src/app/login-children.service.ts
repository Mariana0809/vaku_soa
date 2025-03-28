import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredencialesChildren } from './component/login-children/credencialesChildren';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginChildrenService {
  private urlBase = 'http://localhost:8080/auth/loginChild';

  constructor(private ClienteHttp: HttpClient) {}

  loginChildren(credencialesChildren: CredencialesChildren): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.ClienteHttp.post<AuthResponse>(this.urlBase, credencialesChildren, { headers });
  }
}
