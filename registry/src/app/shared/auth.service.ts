import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn() {
    return null !== localStorage.getItem('token');
  }

  login() {
    localStorage.setItem('token', 'akarmi');
    localStorage.setItem('id', '1');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate([`/`]);
  }

  getUserId(): string | null {
    return localStorage.getItem('id');
  }
}
