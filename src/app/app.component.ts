import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sequoia';

  public user: any;

  constructor (private authService: AuthService) {}

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this.authService.login({'username': this.user.username, 'password': this.user.password});
  }

  refreshToken() {
    this.authService.refreshToken();
  }

  logout() {
    this.authService.logout();
  }
}
