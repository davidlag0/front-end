import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  const mockAuthService = {
    auth_token: 'fake'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        }
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('making http calls', () => {
    it('should add an Authorization header', inject([HttpClient, HttpTestingController],
          (http: HttpClient, httpMock: HttpTestingController) => {

      http.get('/data').subscribe(
        response => {
          expect(response).toBeTruthy();
        }
      );

      const req = httpMock.expectOne(r =>
        r.headers.has('Authorization') &&
        r.headers.get('Authorization') === `JWT ${mockAuthService.auth_token}`);
      expect(req.request.method).toEqual('GET');

      req.flush({ hello: 'world' });
      httpMock.verify();
    }));
  });
});
