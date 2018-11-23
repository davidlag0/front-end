import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpClient } from '@angular/common/http';

interface Data {
  token: string;
}

const testUrl = 'http://127.0.0.1:8000/api';

describe('AuthService', () => {
  let store = {};
  const mockSessionStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  // let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    // Inject the http service and test controller for each test
    // http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear')
      .and.callFake(mockSessionStorage.clear);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('loggedIn()', () => {
    beforeEach(() => {
      sessionStorage.setItem('username', 'fake_user');
      sessionStorage.setItem('auth_token', 'fake_token');
    });

    it('should return true if token is not expired',
      inject([AuthService], (service: AuthService) => {
        sessionStorage.setItem('auth_token_expires', (new Date().valueOf() + 300).toString());
        expect(service.loggedIn()).toBeTruthy();
    }));

    it('should be false if token has expired',
      inject([AuthService], (service: AuthService) => {
        sessionStorage.setItem('auth_token_expires', (new Date().valueOf() - 300).toString());
        expect(service.loggedIn()).toBeFalsy();
    }));
  });

  it('login() should get a valid token if credentials are valid',
    inject([AuthService], (service: AuthService) => {

    const testData: Data = {token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZX\
                                    hwIjoxNTQyNjAyOTA2LCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTQyNTk5MzA2fQ.ry1opounuul32aEMSzp\
                                    6X8kk9RO4vH_5VcRPWD4WeLQ'};

    const user = {
      username: 'blop',
      password: 'blop'
    };

    service.login(user).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(testUrl + '/api-token-auth/');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  }));

  it('login() should get a 401 error if credentials are invalid',
    inject([AuthService], (service: AuthService) => {

    const user = {
      username: 'blop',
      password: 'blop'
    };

    service.login(user).subscribe(
      data => {
        expect(data).toBeFalsy();
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(testUrl + '/api-token-auth/');
    expect(req.request.method).toEqual('POST');
    req.flush('401 error', { status: 401, statusText: 'Unauthorized' });
  }));

  it('refreshToken() should get a valid token if token is valid',
    inject([AuthService], (service: AuthService) => {

    const testData: Data = {token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZX\
                                    hwIjoxNTQyNjAyOTA2LCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTQyNTk5MzA2fQ.ry1opounuul32aEMSz\
                                    p6X8kk9RO4vH_5VcRPWD4WeLQ'};

    service.refreshToken();

    const req = httpTestingController.expectOne(testUrl + '/api-token-refresh/');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  }));

  it('refreshToken() should get a 401 error if token is not valid',
    inject([AuthService], (service: AuthService) => {

    service.refreshToken();

    const req = httpTestingController.expectOne(testUrl + '/api-token-refresh/');
    expect(req.request.method).toEqual('POST');
    req.flush('401 error', { status: 401, statusText: 'Unauthorized' });
  }));
});
