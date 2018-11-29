import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { ErrorInterceptor } from './error.interceptor';

interface Data {
  name: string;
}

const testUrl = '/data';

describe('ErrorInterceptor', () => {
  const mockAuthService = {
    logout() {}
  };

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('intercepting http calls', () => {
    it('should log user out if 401', () => {
      const emsg = 'deliberate 401 error';

      httpClient.get<Data[]>(testUrl).subscribe(
        data => fail('should have failed with 401'),
        (error: HttpErrorResponse) => {
          expect(error).toContain('401 error text');
        }
      );

      const req = httpTestingController.expectOne(testUrl);
      req.flush(emsg, { status: 401, statusText: 'error text' });
      // req.flush({ errorType: 2,
      // errorDetails: [{ errorKey: 'errorKey', errorCode: '1001', errorMessage: 'errorMessage' }],
      // errorIdentifier: 'cfc78ed9-4e771215efdd64b1' },
      // { status: 401, statusText: 'Unauthorized' });
    });

    it('should let the request go as-is if no error', () => {

      httpClient.get<Data[]>(testUrl).subscribe(
        data => {
          expect(data).toBeTruthy();
          expect(data['status']).toEqual(200);
        }
      );
      const req = httpTestingController.expectOne(testUrl);
      req.flush({ status: 200, statusText: 'OK'});
    });

    it('should report the error if there is a network issue', () => {
      const emsg = 'simulated network error';

      httpClient.get<Data[]>(testUrl).subscribe(
        data => fail('should have failed with network error'),
        (error: HttpErrorResponse) => {
          expect(error).toContain('Error: ' + emsg);
        }
      );

      const req = httpTestingController.expectOne(testUrl);

      const mockError = new ErrorEvent('Network error', { message: emsg,
        // The rest of this is optional and not used.
        // Just showing that you could provide this too.
        filename: 'HeroService.ts',
        lineno: 42,
        colno: 21
      });

      req.error(mockError);
    });

    it('should eventually manage a 404 or another error', () => {
      const emsg = 'deliberate 404 error';

      httpClient.get<Data[]>(testUrl).subscribe(
        data => fail('should have failed with 404'),
        (error: HttpErrorResponse) => {
          expect(error).toContain('404 error text');
        }
      );

      const req = httpTestingController.expectOne(testUrl);
      req.flush(emsg, { status: 404, statusText: 'error text' });
    });
  });
});
