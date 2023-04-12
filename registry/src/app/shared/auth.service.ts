import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'api-clients/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  isLoggedIn() {
    return null !== localStorage.getItem('token');
  }

  login(userName: string, password: string) {
    this.authenticationService
      .apiAuthenticationLoginPost({
        userName: userName,
        password: password,
      })
      .subscribe((result) => {
        if (result) {
          if (
            result.token !== undefined &&
            result.token !== null &&
            result.userId !== undefined &&
            result.userId !== null
          ) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.userId); //TODO
          }
        }
      });
  }

  logout() {
    this.authenticationService
      .apiAuthenticationLogoutPost()
      .subscribe((result) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.router.navigate([`/`]);
      });
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
