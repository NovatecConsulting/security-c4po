import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../login/login.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) {
    this.loginService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: User;

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
