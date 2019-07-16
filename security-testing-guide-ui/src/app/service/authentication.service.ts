import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  username: string;

  constructor() { }

  login() {
    this.username = 'NovaTester';
  }

  logout() {
    this.username = null;
  }

}
