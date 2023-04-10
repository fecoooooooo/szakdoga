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
        userName: 'string', //userName,//TODO
        password: 'string', //password//TODO
      })
      .subscribe((result) => {
        if (result) {
          console.log(result.token);
          localStorage.setItem('token', result.token);
          localStorage.setItem('id', '1'); //TODO
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate([`/`]);
  }

  getUserId(): string | null {
    return localStorage.getItem('id');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
