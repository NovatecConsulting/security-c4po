import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BasicAuthService} from "../../services/authentication/basic-auth.service";

import {LoginActions} from '../actions';
import {catchError, map, mergeMap, tap} from "rxjs/operators";

@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions$: Actions,
    private authService: BasicAuthService,
    private router: Router
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.LOGIN),
      mergeMap((action) => this.authService.login(action.username, action.password).pipe(
        map((user) => {
          return LoginActions.LOGIN_SUCCESS({displayName: user.username})
        }),
        catchError(() => LoginActions.LOGIN_ERROR)
      ))
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
     ofType(LoginActions.LOGIN_SUCCESS),
     tap((user) => {
       localStorage.setItem('token', user.displayName);
       localStorage.setItem('basicAuth', window.btoa('viewer:viewer'));
       this.router.navigateByUrl('/dashboard')
     })
    ), { dispatch: false });

}
