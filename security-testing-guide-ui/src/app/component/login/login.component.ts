import {Component, OnInit} from '@angular/core';
import {BasicLoginService} from '../../service/basic-login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../../service/alert.service';
import {OktaAuthService} from '@okta/okta-angular';

// declare var particlesJS: any;

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
              private loginService: BasicLoginService,
              private alertService: AlertService,
              public oktaAuth: OktaAuthService) {

    this.oktaAuth.$authenticationState.subscribe(
      async (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );

    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  async ngOnInit() {

    // particlesJS.load('particles-js', 'assets/particles.json', null);

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    this.loginForm = this.formBuilder.group({
      username: ['viewer', Validators.required],
      password: ['viewer', Validators.required]
    });

    if (this.isAuthenticated === true) {
      this.router.navigate(['/dashboard']);
    }

  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.oktaAuth.loginRedirect('/dashboard');
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
      (data) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log('error', error);
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
