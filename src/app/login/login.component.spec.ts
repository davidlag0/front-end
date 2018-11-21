import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

class MockAuthService {
  login(user): Observable<string[]> {
    return new Observable((observer) => {
      return 'fake data';
    });
  }
};

class MockCodeService {
    getCodes(): Observable<string[]> {
        const result = [
            {index: 0, code: '-'}
        ];

        return Observable.create((observer) => {
            observer.next(result);
            observer.complete();
        });
    }

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ LoginComponent ],
      providers: [{
        provide: AuthService,
        useClass: MockAuthService
      }]
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

  it('should submit credentials to AuthService', () => {
    component.loginForm.controls["username"].setValue("test user")
    component.loginForm.controls["password"].setValue("test password")
    component.onSubmit();
    expect(component.loading).toBeTruthy();
  });
});
