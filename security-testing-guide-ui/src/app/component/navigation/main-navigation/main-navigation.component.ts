import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {HelpDialogComponent} from '../../dialog/help-dialog/help-dialog.component';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {ThemeService} from '../../../service/theme.service';
import {Observable, of} from 'rxjs';

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

  isDarkTheme: Observable<boolean>;

  constructor(private router: Router,
              private helpDialog: MatDialog,
              private themeService: ThemeService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.$user.subscribe((user) => {
      this.user = user;
      console.log('user:', this.user);
      if (this.user != null && this.user.claims != null && this.user.role != null) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  async ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme; // is always dark
    // this.user = this.authenticationService.getCurrentLoggedInUser();
    console.log('ngOnInit(): user:', this.user);
    // if (this.user.claims == null && this.user.role == null) {
      // this.authenticationService.logout();
      // this.isAuthenticated = false;
    // }
    // console.log('isAuthenticated', this.isAuthenticated);
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

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
