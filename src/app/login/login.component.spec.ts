import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// import { Observable } from 'rxjs';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const user = {
    username: 'blop',
    password: 'blop'
  };

  const mockRouter = {
    navigate(path) {
      expect(path).toEqual(['/login']);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ LoginComponent ],
      providers: [
        // { provide: AuthService, useValue: mockAuthService }
        // { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Considering valid credentials are submitted', () => {
    it('should show the spinning wheel and navigate to the return URL', inject([AuthService, Router],
          (authService: AuthService, router: Router) => {
      component.loginForm.controls['username'].setValue('test user');
      component.loginForm.controls['password'].setValue('test password');
      component.onSubmit();
      expect(component.loading).toBeTruthy();
      spyOn(authService, 'login').and.returnValue(of(true));
      spyOn(router, 'navigate').and.callThrough();
    }));
  });

  describe('Considering username is missing', () => {
    it('should not proceed further', () => {
      component.loginForm.controls['username'].setValue('');
      component.loginForm.controls['password'].setValue('test password');
      expect(component.onSubmit()).toBeUndefined();
    });
  });

  describe('Considering credentials are invalid', () => {
    it('should stop the spinning wheel', inject([AuthService], (authService: AuthService) => {
      component.loginForm.controls['username'].setValue('test user');
      component.loginForm.controls['password'].setValue('test password');
      component.onSubmit();
      spyOn(authService, 'login').and.returnValue(of(false));
      expect(component.loading).toBeFalsy();
    }));
  });
});
