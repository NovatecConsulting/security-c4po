import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../service/alert.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Store} from '@ngrx/store';
import {login} from './login.actions';
import * as fromAuth from './login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loadUserLoggedIn: boolean;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromAuth.State>,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.loginForm = this.formBuilder.group({
      username: ['viewer', Validators.required],
      password: ['viewer', Validators.required]
    });

    /*if (this.authenticationService.$user) {
      this.router.navigate(['/dashboard']);
    }*/

    console.log('Checking if user is logged in ...');
    this.loadUserLoggedIn = true;
    // await new Promise(resolve => setTimeout(resolve, 30000));
    this.authenticationService.userIsLoggedIn().then((isLoggedIn) => {
      this.loadUserLoggedIn = false;
      if (isLoggedIn) {
        console.log('navigating to /dashboard ...');
        this.router.navigate(['/dashboard']);
      } else {
        console.log('no user is logged in.');
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  loginWithCredentials() { // is only async because of setTimeout await
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    // await new Promise(resolve => setTimeout(resolve, 3000));

    // console.log('Loading ...');
    /*
    this.authenticationService.loginBasicAuth(this.f.username.value, this.f.password.value).subscribe((isValid) => {
      console.log('isValid:', isValid);
      // this.loading = false;
      if (isValid) {
        this.router.navigate(['/dashboard']);
      }
    });
    */
    const username = this.f.username.value;
    const password = this.f.password.value;

    // TODO: async
    this.authenticationService.asyncLoginBasicAuth(this.f.username.value, this.f.password.value).then((isValid) => {
      console.log('Basic Auth Success:', isValid);
      this.loading = false;
      if (isValid) {
        console.log('Redirecting to /dashboard ...');
        this.router.navigate(['/dashboard']);
      }
    });

    /*this.basicAuthService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe((user) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, (error) => {
        console.log('error', error);
        this.loading = false;
        this.alertService.error(error);
      });*/
    // this.loading = false;
    this.store.dispatch(login({username, password}));
  }

  loginWithOkta() {
    this.authenticationService.loginWithOkta();
  }

  loginWithAuth0() {
    console.log('Auth0 not configured yet.');
  }

}
