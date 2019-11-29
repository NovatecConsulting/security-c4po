import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private oktaAuth: OktaAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    if (request.url === 'https://localhost:8443/api/v1/login') {
      return next.handle(request).toPromise();
    }
    if (request.urlWithParams.startsWith('https://localhost')) {
      await this.getAuthorization().then(auth => {
        const authType = Object.keys(auth).toString();
        request = request.clone({
          setHeaders: {
            Authorization: `${authType} ${auth[authType]}`
          }
        });
      });
    }
    // console.log('Authorization:', request.headers.get('Authorization'));
    return next.handle(request).toPromise();
  }

  private async getAuthorization() {
    let authorization: {};
    if (localStorage.getItem('basicAuth')) {
      authorization = {'Basic': localStorage.getItem('basicAuth')};
    }
    const accessToken = await this.oktaAuth.getAccessToken();
    authorization = accessToken ? {'Bearer': accessToken} : authorization;
    return authorization;
  }

}
