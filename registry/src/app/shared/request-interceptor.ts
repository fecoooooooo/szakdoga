import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((e) => {
        if (e instanceof HttpResponse) {
          if (
            req.method === 'PATCH' ||
            req.method === 'PUT' ||
            req.method === 'POST' ||
            req.method === 'DELETE'
          ) {
            this.toastrService.success('', 'Sikeres művelet');
          }
        }
      }),
      catchError((err) => {
        if (err.status === 400 || err.status === 500) {
          this.toastrService.error(err.statusText, 'Hiba');
        }
        return throwError(err);
      })
    );
  }
}
