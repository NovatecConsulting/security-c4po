import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BasicLoginService} from '../service/basic-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: BasicLoginService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = this.loginService.currentUserValue;
    if (user) {
      return Promise.resolve(true);
    }
    // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return Promise.resolve(false);
  }
}
