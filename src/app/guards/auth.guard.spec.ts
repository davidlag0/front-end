import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';


describe('AuthGuard', () => {
  const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  const mockAuthService = {
      loggedIn() {
        if (loggedIn === true) {
          return true;
        } else {
          return false;
        }
      }
  };

  const mockRouter = {
    navigate(path) {
      expect(path).toEqual(['/login']);
    }
  };

  let loggedIn: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: RouterStateSnapshot, useValue: mockSnapshot }
      ]
    });
  });

  it('should be ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return false for non-logged-in users and navigate to /login',
        inject([AuthGuard], (guard: AuthGuard) => {

    loggedIn = false;
    expect(guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toEqual(false);
  }));

  it('should return true for a logged-in user',
        inject([AuthGuard], (guard: AuthGuard) => {

    loggedIn = true;
    expect(guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toEqual(true);
  }));
});
