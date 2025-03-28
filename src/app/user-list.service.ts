import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListUserResponse, User } from './models/listUser';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  private urlBase = 'http://localhost:8080/employee';

  constructor(private ClienteHttp: HttpClient) {}

  listUser(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.ClienteHttp.get<User[]>(this.urlBase, { headers });
  }
}