import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetpassComponent } from './forgetpass.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockAuthService {
  resetPassword(data: any) {
    return of({ success: true }); // Simuler une réponse réussie
  }
}

describe('ForgetpassComponent', () => {
  let component: ForgetpassComponent;
  let fixture: ComponentFixture<ForgetpassComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ForgetpassComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetpassComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password matching', () => {
    component.forgetPassForm.controls['newPassword'].setValue('password123');
    component.forgetPassForm.controls['confirmPassword'].setValue('password123');
    expect(component.forgetPassForm.errors).toBeNull();
  });

  it('should call send method and navigate on success', () => {
    component.forgetPassForm.controls['oldPassword'].setValue('oldPassword123');
    component.forgetPassForm.controls['newPassword'].setValue('newPassword123');
    component.forgetPassForm.controls['confirmPassword'].setValue('newPassword123');

    component.send();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});