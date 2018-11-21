import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [AuthGuard]
    });

    it('should be ...', inject([AuthGuard], (guard: AuthGuard) => {
      expect(guard).toBeTruthy();
    }));
  });
/*
  describe('canActivate', () => {
    //let router;

    it('should return true for a logged in user', inject([AuthGuard], (guard: AuthGuard) => {
      //console.log("BLOP!")
    }));
  });*/
});

/*
class MockRouter {
  navigate(path) {}
}

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuard;
    let authService;
    let router;

    it('should return true for a logged in user', () => {
      authService = { loggedIn: () => true };
      console.log("test:" + authService.loggedIn());
      router = new MockRouter();
      authGuard = new AuthGuard(authService, router);

      expect(authGuard.canActivate(authService, router)).toEqual(true);
    });

    it('should navigate to home for a logged out user', () => {
      authService = { loggedIn: () => false };
      router = new MockRouter();
      authGuard = new AuthGuard(authService, router);
      spyOn(router, 'navigate');

      expect(authGuard.canActivate(authService, router)).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
*/
