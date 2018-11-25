import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { throwError } from 'rxjs';

class MockActivatedRoute {
  snapshot = { queryParams: 'testparam' };
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginError: boolean;

  const mockRouter = {
    navigate(path) {
      // console.log('path:' + path);
    }
  };

  const mockAuthService = {
    login(user) {
      if (loginError) {
        return throwError('error message');
      } else {
        return of('test data');
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.loginForm.controls['username'].setValue('test user');
    component.loginForm.controls['password'].setValue('test password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Considering valid credentials are submitted', () => {
    it('should show the spinning wheel and navigate to the return URL', () => {
      loginError = false;
      component.onSubmit();
      expect(component.loading).toBeTruthy();
    });
  });

  describe('Considering username is missing', () => {
    it('should not proceed further', () => {
      component.loginForm.controls['username'].setValue('');
      expect(component.onSubmit()).toBeUndefined();
    });
  });

  describe('Considering credentials are invalid', () => {
    it('should stop the spinning wheel', () => {
      loginError = true;
      component.onSubmit();
      expect(component.loading).toBeFalsy();
      expect(component.error).toBe('error message');
    });
  });
});
