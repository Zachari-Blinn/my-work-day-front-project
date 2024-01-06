import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

const BASE_URL = `${environment.BASE_URL}/auth`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      BASE_URL + '/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      BASE_URL + '/signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  public logout(): Observable<any> {
    return this.http.post(BASE_URL + '/signout', {}, httpOptions);
  }

  public refreshToken() {
    return this.http.post(BASE_URL + '/refreshtoken', {}, httpOptions);
  }
}
