import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {BasicAuthService, UserDetails} from './basic-auth.service';
import {OktaAuthService, UserClaims} from '@okta/okta-angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {Role} from '../../model/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>({claims: null, role: null});
  public $user: Observable<User> = this.userSubject.asObservable();

  constructor(private basicAuthService: BasicAuthService,
              private oktaAuthService: OktaAuthService) {

    // TODO: include basic-login as well as oktaAuthService
    // this.$user = this.basicAuthService.$basicAuthUser;

    this.basicAuthService.$basicAuthUser.subscribe((userDetails: UserDetails) => {
      if (userDetails) {
        console.log('Basic Auth:', userDetails);
        const user: User = {
          claims: {
            sub: null,
            iss: 'SpringSecurity',
            name: userDetails.username
          },
          role: Role.Viewer
        };
        this.userSubject.next(user);
      } else {
        this.userSubject.next(null);
      }
    });

    this.oktaAuthService.getUser().then((userClaims: UserClaims) => {
      if (userClaims) {
        console.log('OAuth (Okta):', userClaims);
        const oktaUser: User = {
          claims: userClaims,
          role: Role.Viewer
        };
        // console.log('OAuth (Okta):', oktaUser);
        this.userSubject.next(oktaUser);
      }
      // console.log('userSubject:', this.userSubject.getValue());
    });
  }

  someOktaUserListeningAndMappingToUserObject() {
    /*this.oktaAuthService.$authenticationState.subscribe(
      async (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        console.log('authenticationState changed to', this.isAuthenticated);
        this.getUserNameAndRole().then(() => console.log('getUsernameAndRole done.'));
      }
    );*/
  }

  /*
  async getUserNameAndRole() {
    this.isAuthenticated = await this.oktaAuthService.isAuthenticated();
    // console.log('isAuthenticated', this.isAuthenticated);
    this.user.claims = await this.getUserClaims();
    // console.log('this.$user.claims', this.$user.claims);
    this.accessToken = await this.getAccessToken();
    // console.log('this.accessToken', this.accessToken);
    // TODO: how to wait for await to finish and THEN extract from answer?
    this.user.role = MainNavigationComponent.extractRoleFromToken(this.accessToken);
    console.log('this.$user.role:', this.user.role);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  async getUserClaims() {
    return await this.oktaAuthService.getUser();
  }

  async getAccessToken() {
    return this.oktaAuthService.getAccessToken();
  }
  static extractRoleFromToken(token: string) {
    if (token !== undefined) {
      const groups = JSON.parse(window.atob(token.split('.')[1])).groups;
      return groups.includes('Tester') ? Role.Tester : Role.Viewer;
    }
  }
  */

  loginBasicAuth(username: string, password: string): Promise<boolean> {
    this.basicAuthService.login(username, password).subscribe(value => {
      return value;
    });
    return new Promise<boolean>(() => true);

    /*this.basicAuthService.login(username, password).pipe(first()).subscribe((user) => {
      console.log('$user from basic auth service: ', user);
      const u: User = {
        claims: {
          sub: 'sub',
          name: user['username']
        },
        role: user['authorities'][0]['authority']
      };
      // this.$user = new BehaviorSubject<User>(JSON.parse($user).asObservable());
      this.$user = new BehaviorSubject<User>(u).asObservable();
      // return $user;
      return true;
    });*/
  }

  loginWithOkta() {
    this.oktaAuthService.loginRedirect('/dashboard');
  }

  // logs out all auth services
  logout() {
    this.basicAuthService.logout();
    this.oktaAuthService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('Logging out of Okta ...');
        this.oktaAuthService.logout().catch(
          (err) => console.log('Okta Logout failed. Error: ', err)
        );
      }
    });
    localStorage.removeItem('okta-token-storage');
    this.$user = null;
  }

}
