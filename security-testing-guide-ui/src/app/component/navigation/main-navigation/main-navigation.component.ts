import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../service/login.service';
import {OktaAuthService, UserClaims} from '@okta/okta-angular';
import {Role} from '../../../model/role.enum';
import {MatDialog} from '@angular/material';
import {HelpDialogComponent} from '../../dialog/help-dialog/help-dialog.component';
import {User} from '../../../model/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  isAuthenticated: boolean;
  user: User = new class implements User {
    claims: UserClaims;
    role: Role;
    token: string;
  };

  constructor(private router: Router,
              private loginService: LoginService,
              private helpDialog: MatDialog,
              public oktaAuth: OktaAuthService) {

    this.oktaAuth.$authenticationState.subscribe(
      async (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        console.log('authenticationState changed to', this.isAuthenticated);
      }
    );
  }

  static extractRoleFromToken(token: string) {
    const groups = JSON.parse(window.atob(token.split('.')[1])).groups;
    console.log(groups);
    return groups.includes('Tester') ? Role.Tester : Role.Viewer;
  }

  async ngOnInit() {
    /*this.oktaAuth.isAuthenticated().then((res) => {
      this.isAuthenticated = res;
    });*/
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log('isAuthenticated', this.isAuthenticated);

    this.user.claims = await this.getUserClaims();
    console.log('this.user.claims', this.user.claims);
    this.user.token = await this.getAccessToken();
    console.log('this.user.token', this.user.token);
    // TODO: how to wait for await to finish and THEN extract from answer?
    this.user.role = MainNavigationComponent.extractRoleFromToken(this.user.token);
    console.log('this.user.role', this.user.role);

    /*this.oktaAuth.getUser().then((userClaims) => {
      this.user.claims = userClaims;
      console.log('userClaims', userClaims);
      this.oktaAuth.getAccessToken().then((accessToken) => {
        console.log('accessToken', accessToken);
        this.user.token = accessToken;
        this.user.role = MainNavigationComponent.extractRoleFromToken(this.user.token);
      }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));*/

    // this.user.claims = await this.oktaAuth.getUser();
    // this.user.token = await this.oktaAuth.getAccessToken();
    // this.user.role = await this.extractRoleFromToken();
  }

  async getUserClaims() {
    return await this.oktaAuth.getUser();
  }

  async getAccessToken() {
    return this.oktaAuth.getAccessToken();
  }

  logout() {
    this.oktaAuth.logout('/');
    this.router.navigate(['/login']);
  }

  showHelp(): void {
    this.helpDialog.open(HelpDialogComponent, {
      width: '50%',
      height: '75%'
    });
  }

}
