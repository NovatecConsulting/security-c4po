import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../login/login.service';
import {User} from '../../../model/user';
import {OktaAuthService} from '@okta/okta-angular';

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
              public oktaAuth: OktaAuthService) {
    this.loginService.currentUser.subscribe(x => this.user = x);
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
    console.log('user', this.user);
  }

  logout() {
    this.oktaAuth.logout('/');
    // this.loginService.logout();
    // this.router.navigate(['/login']);
  }

}
