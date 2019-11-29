import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {HelpDialogComponent} from '../../dialog/help-dialog/help-dialog.component';
import {User} from '../../../models/user';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {ThemeService} from '../../../services/theme.service';
import {Observable, of} from 'rxjs';
import {PingService} from '../../../services/ping.service';
import {BasicAuthService} from "../../../services/authentication/basic-auth.service";

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
  isReduceMotion: Observable<boolean>;

  constructor(private router: Router,
              private helpDialog: MatDialog,
              private themeService: ThemeService,
              private pingService: PingService,
              private authenticationService: AuthenticationService) {
    // this.authenticationService.$user.subscribe((user) => {
    //   this.user = user;
    //   console.log('user:', this.user);
    //   if (this.user != null && this.user.claims != null && this.user.role != null) {
    //     this.isAuthenticated = true;
    //   } else {
    //     this.isAuthenticated = false;
    //   }
    // });
  }

  ngOnInit() {
    // this.isDarkTheme = this.themeService.isDarkTheme; // is always dark
    // this.themeService.setDarkTheme(true);
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

  toggleReduceMotion(checked: boolean) {
    this.themeService.setReduceMotion(checked);
    const speed: number = checked ? 0 : 1;
    eval('window.pJSDom[0].pJS.particles.move.speed = ' + speed + ';');
  }

}
