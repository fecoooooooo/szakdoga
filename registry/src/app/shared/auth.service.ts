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
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate([`/`]);
  }
}
