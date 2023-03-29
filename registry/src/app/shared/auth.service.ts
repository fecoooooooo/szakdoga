import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return null !== localStorage.getItem('token');
  }

  login() {
    localStorage.setItem('token', 'akarmi');
  }
}
