import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'api-clients/api';
import { Observable, defaultIfEmpty, map } from 'rxjs';

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

  login(userName: string, password: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve) => {
      return this.authenticationService
        .apiAuthenticationLoginPost({
          userName: userName,
          password: password,
        })
        .toPromise()
        .then((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);

          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });

    return promise;
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
