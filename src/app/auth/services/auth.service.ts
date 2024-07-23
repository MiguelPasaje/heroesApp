import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get cuerrentUSer(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user); //para que no tenga acceso directamente al objeto
    // return {...this.user}//para que no tenga acceso directamente al objeto
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', user.id.toString()))
    );
  }

  checkAutentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token')
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user),// la doble negacion es para que no devuelva objeto sino un true
      catchError(err => of(false))
    )
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('token');
    localStorage.clear();
  }
}
