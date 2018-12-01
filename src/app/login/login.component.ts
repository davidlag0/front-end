import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  public user: any;

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Get return url from route parameters or default to '/'.
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;

    this.authService.login(this.user)
      .subscribe(
        data => { this.router.navigate([this.returnUrl]); },
        error => {
          this.error = error;
          this.loading = false;
          this.snackBar.open('Bad username or password', '', {
            duration: 2000,
          });
          // console.log(this.error);
        });
  }
}
