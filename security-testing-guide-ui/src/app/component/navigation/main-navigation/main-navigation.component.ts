import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {HelpDialogComponent} from '../../dialog/help-dialog/help-dialog.component';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  // do not cache
  isAuthenticated: boolean;
  // do cache
  user: User;

  constructor(private router: Router,
              private helpDialog: MatDialog,
              private authenticationService: AuthenticationService) {
    this.authenticationService.$user.subscribe((user) => {
      // console.log(user);
      this.user = user;
      this.isAuthenticated = !!this.user;
    });
  }

  async ngOnInit() {
    console.log('ngOnInit(): user:', this.user);
    // this.isAuthenticated = !!this.authenticationService.getLoggedInUser();
    // console.log('loggedInUser:', this.authenticationService.getLoggedInUser(), this.isAuthenticated);
    // this.getUserNameAndRole().then(() => console.log('getUsernameAndRole done.'));
    /*this.oktaAuthService.getUser().then((userClaims) => {
      this.$user.claims = userClaims;
      console.log('userClaims', userClaims);
      this.oktaAuthService.getAccessToken().then((accessToken) => {
        console.log('accessToken', accessToken);
        this.$user.token = accessToken;
        this.$user.role = MainNavigationComponent.extractRoleFromToken(this.$user.token);
      }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));*/
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
