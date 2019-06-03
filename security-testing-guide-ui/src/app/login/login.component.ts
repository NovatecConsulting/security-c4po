import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../component/alert/alert.service';
import {OktaAuthService} from '@okta/okta-angular';

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
              private loginService: LoginService,
              private alertService: AlertService,
              public oktaAuth: OktaAuthService) {

    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );

    // if (this.loginService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  async ngOnInit() {

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    // localStorage.clear();
    /*if (localStorage.getItem('username')) {
    }
    this.loginForm = this.formBuilder.group({
      username: ['user', Validators.required],
      password: ['user', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    */
  }


  get f() {
    return this.loginForm.controls;
  }


  login() {
    this.oktaAuth.loginRedirect('/dashboard');
  }

  onSubmit() {
    /* remove */
  }

  /*
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
      (data) => {
        this.router.navigate([this.returnUrl]);
    },
      (error) => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
  */

}
