import {Component, OnInit} from '@angular/core';
import {BasicLoginService} from '../../service/basic-login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../../service/alert.service';
import {OktaAuthService} from '@okta/okta-angular';
import {AuthenticationService} from '../../service/authentication.service';

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

  isAuthenticated: boolean;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private basicLoginService: BasicLoginService,
              public oktaAuthService: OktaAuthService) {
    this.oktaAuthService.$authenticationState.subscribe(
      async (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
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

    if (this.authenticationService.getLoggedInUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  loginWithCredentials() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.basicLoginService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe((user) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, (error) => {
        console.log('error', error);
        this.loading = false;
        this.alertService.error(error);
      });
  }

  loginWithOkta() {
    this.oktaAuthService.loginRedirect('/dashboard');
  }

  loginWithAuth0() {
    console.log('auth0 not configured yet.');
  }

}
