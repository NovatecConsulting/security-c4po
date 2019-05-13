import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,
              private loginService: LoginService) {
    this.loginService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }
  currentUser: User;

}
