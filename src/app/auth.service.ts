import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post(this.APIUrl + '/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['auth_token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(this.APIUrl + '/api-token-refresh/', JSON.stringify({token: this.auth_token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['auth_token']);
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

    localStorage.removeItem("auth_token");
    localStorage.removeItem("token_expires");
  }

  private updateData(auth_token) {
    this.auth_token = auth_token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.auth_token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;

    localStorage.setItem("auth_token", this.auth_token);
    localStorage.setItem("token_expires", JSON.stringify(this.token_expires.valueOf()) );
  }

}
