import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicLoginService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  private BASE_URL = 'https://localhost:8443/api/v1';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + window.btoa(username + ':' + password)
    });

    return this.http.post<any>(this.BASE_URL + '/login', null, {headers: headers})
      .pipe(map(user => {
        localStorage.setItem('userDetails', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('userDetails');
    this.currentUserSubject.next(null);
  }

}
