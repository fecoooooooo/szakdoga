import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'api-clients/api/api/authentication.service';
import { environment } from 'environtments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify the request object here
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer your-auth-token'),
    });

    // Pass the modified request on to the next interceptor or to the HttpHandler if this is the last interceptor in the chain
    return next.handle(modifiedRequest);
  }
}
