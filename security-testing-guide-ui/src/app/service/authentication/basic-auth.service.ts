import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  private basicAuthUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('userDetails')));
  public $basicAuthUser = this.basicAuthUserSubject.asObservable();

  private BASE_URL = 'https://localhost:8443/api/v1';

  constructor(private http: HttpClient) {
  }

  /*public get currentUserValue(): User {
    return this.basicAuthUserSubject.value;
  }*/

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + window.btoa(username + ':' + password)
    });
    return this.http.post<any>(this.BASE_URL + '/login', null, {headers: headers}).pipe(
      map((userDetails: UserDetails) => {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      localStorage.setItem('basicAuth', window.btoa(username + ':' + password));
      this.basicAuthUserSubject.next(userDetails);
      return true;
      }),
      catchError((err: HttpErrorResponse) => {
        // console.log('HTTP Status:', err.status);
        return of(false);
      })
    );
  }

  logout() {
    console.log('Logging out of Basic Auth ...');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('basicAuth');
    this.basicAuthUserSubject.next(null);
  }

}

export interface UserDetails {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  password: string;
  username: string;
  authorities: [{
    authority: string
  }];
}
