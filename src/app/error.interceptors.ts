import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse)=> {
        let errorMessage = 'An unknown error occurred!';
        
        if (error.error && error.error.message) {
          // Access the error message inside the error object
          errorMessage = error.error.message;
        } else if (error.status === 409) {
          // Fallback for 409 Conflict, if message is not available in error object
          errorMessage = 'Account Already Exists !';
        }
        return throwError(() => new Error(errorMessage));

      })
    );
  }
}
