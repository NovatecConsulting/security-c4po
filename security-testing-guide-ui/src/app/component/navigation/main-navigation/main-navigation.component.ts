import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BasicLoginService} from '../../../service/basic-login.service';
import {OktaAuthService, UserClaims} from '@okta/okta-angular';
import {Role} from '../../../model/role.enum';
import { MatDialog } from '@angular/material/dialog';
import {HelpDialogComponent} from '../../dialog/help-dialog/help-dialog.component';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  // do not cache
  isAuthenticated: boolean;
  accessToken: string;

  // do cache
  user: User = new class implements User {
    claims: UserClaims;
    role: Role;
  };

  constructor(private router: Router,
              private basicLoginService: BasicLoginService,
              private helpDialog: MatDialog,
              public oktaAuthService: OktaAuthService,
              private authenticationService: AuthenticationService) {
    this.oktaAuthService.$authenticationState.subscribe(
      async (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        console.log('authenticationState changed to', this.isAuthenticated);
        this.getUserNameAndRole().then(() => console.log('getUsernameAndRole done.'));
      }
    );

    this.authenticationService.user.subscribe((user) => {
      console.log('User in navbar:', user);
      this.user = user;
      this.isAuthenticated = !!this.user;
    });

    /*
    this.basicLoginService.currentUser.subscribe(
      (currentUser) => {
        if (currentUser) {
          console.log('currentUser', currentUser);
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      }
    );
    */
  }

  static extractRoleFromToken(token: string) {
    if (token !== undefined) {
      const groups = JSON.parse(window.atob(token.split('.')[1])).groups;
      return groups.includes('Tester') ? Role.Tester : Role.Viewer;
    }
  }

  async ngOnInit() {
    console.log('authenticated: ', this.authenticationService.getLoggedInUser());
    // this.isAuthenticated = !!this.authenticationService.getLoggedInUser();
    // console.log('loggedInUser:', this.authenticationService.getLoggedInUser(), this.isAuthenticated);
    // this.getUserNameAndRole().then(() => console.log('getUsernameAndRole done.'));
    /*this.oktaAuthService.getUser().then((userClaims) => {
      this.user.claims = userClaims;
      console.log('userClaims', userClaims);
      this.oktaAuthService.getAccessToken().then((accessToken) => {
        console.log('accessToken', accessToken);
        this.user.token = accessToken;
        this.user.role = MainNavigationComponent.extractRoleFromToken(this.user.token);
      }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));*/
  }

  async getUserNameAndRole() {
    this.isAuthenticated = await this.oktaAuthService.isAuthenticated();
    // console.log('isAuthenticated', this.isAuthenticated);
    this.user.claims = await this.getUserClaims();
    // console.log('this.user.claims', this.user.claims);
    this.accessToken = await this.getAccessToken();
    // console.log('this.accessToken', this.accessToken);
    // TODO: how to wait for await to finish and THEN extract from answer?
    this.user.role = MainNavigationComponent.extractRoleFromToken(this.accessToken);
    console.log('this.user.role:', this.user.role);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  async getUserClaims() {
    return await this.oktaAuthService.getUser();
  }

  async getAccessToken() {
    return this.oktaAuthService.getAccessToken();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  showHelp(): void {
    this.helpDialog.open(HelpDialogComponent, {
      width: '50%',
      height: '75%'
    });
  }

}
