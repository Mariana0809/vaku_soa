import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredencialesChildren } from './component/login-children/credencialesChildren';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginChildrenService {
  private urlBase = 'http://localhost:8080/auth/loginChild';

  constructor(private ClienteHttp: HttpClient) {}

  loginChildren(credencialesChildren: CredencialesChildren): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.ClienteHttp.post(this.urlBase,credencialesChildren,{headers});
  }
}
