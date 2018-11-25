import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  const mockAuthService = {
    logout() {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('intercepting http calls', () => {
    it('should log user out if 401', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

      http.get('/data').subscribe(
        data => {
          expect(data).toBeFalsy();
        },
        err => {
          expect(err).toBeTruthy();
        }
      );

      const req = httpMock.expectOne('/data');
      req.flush('401 error', { status: 401, statusText: 'Unauthorized' });

      httpMock.verify();
    }));

    it('should let the request go as-is if no error',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

      http.get('/data').subscribe(
        data => {
          expect(data).toBeTruthy();
        },
        err => {
          expect(err).toBeFalsy();
        }
      );

      const req = httpMock.expectOne('/data');
      req.flush('200 OK', { status: 200, statusText: 'OK'});
      httpMock.verify();
    }));
  });
});
