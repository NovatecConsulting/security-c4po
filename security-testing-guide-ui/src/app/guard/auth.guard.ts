import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const user$ = this.authenticationService.getLoggedInUser();
    // console.log('User logged in:', user$);
    return user$.pipe(
      map(user => {
        console.log('User logged in:', !!user);
        return user ? true : this.router.createUrlTree(['/login']);
      })
    );
  }
}
