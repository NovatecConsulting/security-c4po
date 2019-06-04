import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../service/login.service';
import {OktaAuthService} from '@okta/okta-angular';
import {Role} from '../../../model/role.enum';
import {MatDialog} from '@angular/material';
import {HelpDialogComponent} from '../../dialog/help-dialog/help-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  isAuthenticated: boolean;
  user: any;

  constructor(private router: Router,
              private loginService: LoginService,
              private helpDialog: MatDialog,
              public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      async(isAuthenticated: boolean)  => {
        this.isAuthenticated = isAuthenticated;
        this.user = await this.oktaAuth.getUser();
      }
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.user = await this.oktaAuth.getUser();
    this.user.role = await this.getUserRole();
    console.log('user', this.user);
  }

  logout() {
    this.oktaAuth.logout('/');
    this.router.navigate(['/dashboard']);
  }

  async getUserRole() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const groups = JSON.parse(window.atob(accessToken.split('.')[1])).groups;
    console.log(groups);
    return groups.includes('Tester') ? Role.Tester : Role.Viewer;
  }

  showHelp(): void {
    this.helpDialog.open(HelpDialogComponent, {
      width: '50%',
      height: '75%'
    });
  }

}
