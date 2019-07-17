import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {BasicLoginService} from './basic-login.service';
import {OktaAuthService} from '@okta/okta-angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {Role} from '../model/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<User> = this.basicLoginService.currentUser;
  // private userSubject: BehaviorSubject<User>;

  constructor(private basicLoginService: BasicLoginService,
              private oktaAuthService: OktaAuthService) {

    /*this.userSubject = new BehaviorSubject<User>({
      claims: null,
      role: Role.Viewer
    });*/

    // TODO: include basic-login as well as oktaAuthService
    this.user = this.basicLoginService.currentUser;

    this.oktaAuthService.getUser().then((userClaims) => {
      const oktaUser: User = {
        claims: userClaims,
        role: Role.Viewer
      };
      const userSubject = new BehaviorSubject<User>(oktaUser);
      this.user = userSubject.asObservable();
      console.log('oktaUser', oktaUser);
    });

    // this.user = this.userSubject.asObservable();
    // this.userSubject.next({
    //   claims: {
    //     sub: '',
    //     name: 'MyUserName'
    //   },
    //   role: Role.Viewer
    // });

    // this.basicLoginService.currentUser.subscribe((user) => {
    //   console.log('user', user);
    //   this.userSubject.next(user);
    // });
  }

  login() {
  }

  getLoggedInUser(): Observable<User> {
    return this.user;
  }

  logout() {
    this.basicLoginService.logout();
    this.oktaAuthService.logout();
    this.user = null;
  }

}
