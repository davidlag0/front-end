import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private auth_token: string;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Add authorization header with JWT token if available.
    this.auth_token = sessionStorage.getItem('auth_token');

    if (this.auth_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.auth_token}`
        }
      });
    }
    return next.handle(request);
  }
}
