import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 400 || err.status === 500) {
          this.toastrService.error(err.statusText, 'Hiba');
        }
        return throwError(err);
      })
    );
  }
}
