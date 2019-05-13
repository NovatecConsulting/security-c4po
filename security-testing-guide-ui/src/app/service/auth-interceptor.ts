import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    req = req.clone({
      setHeaders: {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      }
    });
    return next.handle(req);
  }
}
