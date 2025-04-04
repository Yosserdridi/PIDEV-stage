import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from '../../../components/User/forgot-password/forgot-password.component';
import { AccountService } from '../../../services/account.service'; // Chemin correct
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginforgetpasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAccountService = jasmine.createSpyObj('AccountService', ['userForgetPassword', 'forgetPasswordbyemail']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form successfully', () => {
    component.fg.controls['email'].setValue('test@example.com');
    component.fg.controls['recaptcha'].setValue('dummy-token');
    mockAccountService.userForgetPassword.and.returnValue(of({}));

    component.submitfg();

    expect(component.showResetPasswordCard).toBeTrue();
    expect(mockAccountService.userForgetPassword).toHaveBeenCalledWith('test@example.com');
  });

  it('should handle errors on submit', () => {
    component.fg.controls['email'].setValue('test@example.com');
    component.fg.controls['recaptcha'].setValue('dummy-token');
    mockAccountService.userForgetPassword.and.returnValue(throwError('error'));

    component.submitfg();

    expect(mockAccountService.userForgetPassword).toHaveBeenCalledWith('test@example.com');
  });
});