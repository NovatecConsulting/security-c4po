import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    if (!this.authenticationService.getToken()) {
      this.router.navigateByUrl('/login');
      return of(false);
    }
    // const user$ = this.authenticationService.$user;
    // if (user$ !== null) {
    //   return user$.pipe(
    //     map(user => {
    //       // console.log('User logged in:', user);
    //       return user ? true : this.router.createUrlTree(['/LOGIN']);
    //     })
    //   );
    // }
    return of(true);
  }
}
