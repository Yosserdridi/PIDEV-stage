import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service'; // Chemin correct

import { of, throwError } from 'rxjs'; // Importer of et throwError

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    // Initialiser le formulaire réactif si nécessaire
    component.user = { email: '', password: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on submit', () => {
    // Arrange
    component.user.email = 'test@example.com';
    component.user.password = 'password';
    
    // Act
    component.onSubmit(fixture.nativeElement.querySelector('form'));
    
    // Assert
    expect(authServiceMock.login).toHaveBeenCalledWith(component.user.email, component.user.password);
  });

  it('should navigate to admin dashboard on successful login', () => {
    // Arrange
    component.user.email = 'sirine.hamzaoui@esprit.tn';
    component.user.password = '222JMT5343';

    authServiceMock.login.and.returnValue(of({ accessToken: 'mockToken', refreshToken: 'mockRefreshToken', authorities: [{ authority: 'ADMIN' }] }));
    
    // Act
    component.onSubmit(fixture.nativeElement.querySelector('form'));
    
    // Assert
    expect(routerMock.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should display error message on unsuccessful login', () => {
    // Arrange
    component.user.email = 'test@example.com';
    component.user.password = 'wrongPassword';

    authServiceMock.login.and.returnValue(throwError(new Error('Authentication failed.')));
    
    // Act
    component.onSubmit(fixture.nativeElement.querySelector('form'));
    
    // Assert
    expect(component.loginError).toBe('Invalid email or password. Please try again.');
  });
  it('should navigate to modify password page', () => {
    component.onModifyPass();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/modify-pass']);
  });
});