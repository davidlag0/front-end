import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private APIUrl = 'http://127.0.0.1:8000/api';

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public auth_token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  // Observable for the login Component.
  public observable = new Observable;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    if (sessionStorage.getItem("username")) {
      this.username = sessionStorage.getItem("username");
    }

    console.log("constructor");
  }

/*
  ngOnInit() {
    console.log("bloppy!");
    if (sessionStorage.getItem("username")) {
      this.username = sessionStorage.getItem("username");
    }
  };
  */

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    return new Observable((observer) => {
      this.http.post(this.APIUrl + '/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
        data => {
          this.updateData(data['token']);
          observer.next(data['token']);
        },
        err => {
          this.errors = err['error'];
          observer.error(this.errors);
        }
      );
    });
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(this.APIUrl + '/api-token-refresh/', JSON.stringify({token: this.auth_token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.auth_token = null;
    this.token_expires = null;
    this.username = null;

    sessionStorage.removeItem("username");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_token_expires");
  }

  private updateData(auth_token) {
    this.auth_token = auth_token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.auth_token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;

    sessionStorage.setItem("username", this.username);
    sessionStorage.setItem("auth_token", this.auth_token);
    sessionStorage.setItem("auth_token_expires", JSON.stringify(this.token_expires.valueOf()) );
  }

  public loggedIn() {
    if (JSON.parse(sessionStorage.getItem("auth_token_expires"))) {
      if (JSON.parse(sessionStorage.getItem("auth_token_expires")).valueOf() > new Date().valueOf()) {
        return true;
      }
      else {
        this.logout()
      }
    }
    else {
      this.logout()
    }
  }

}
