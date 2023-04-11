import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'environtments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify the request object here

    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const isLoggedIn = this.authService.isLoggedIn();

    console.log(environment.apiUrl);
    console.log(request.url);
    console.log(isApiUrl);
    console.log(isLoggedIn);
    console.log(this.authService.getToken()!);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.authService.getToken()!
        ),
      });
    }

    return next.handle(request);
  }
}
