import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {LoginService} from '../login/login.service';
import {OktaAuthService} from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private oktaAuth: OktaAuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (this.oktaAuth.isAuthenticated()) {
      return true;
    }

    /*
    const user = this.loginService.currentUserValue;
    if (user) {
      return true;
    }
    */

    this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }});
    return false;
  }
}
