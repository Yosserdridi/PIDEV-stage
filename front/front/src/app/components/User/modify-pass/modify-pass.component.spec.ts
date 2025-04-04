import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyPassComponent } from './modify-pass.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockAccountService {
  user = of({ username: 'testUser' }); // Simuler un utilisateur connecté
  forgetPasswordbyemail(username: string, data: any) {
    return of({ success: true }); // Simuler une réponse réussie
  }
}

describe('ModifyPassComponent', () => {
  let component: ModifyPassComponent;
  let fixture: ComponentFixture<ModifyPassComponent>;
  let accountService: AccountService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ModifyPassComponent],
      providers: [
        { provide: AccountService, useClass: MockAccountService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyPassComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password matching', () => {
    component.modifyPassForm.controls['newPassword'].setValue('password123');
    component.modifyPassForm.controls['confirmPassword'].setValue('password123');
    expect(component.modifyPassForm.errors).toBeNull();
  });

  it('should call send method and navigate on success', () => {
    component.modifyPassForm.controls['oldPassword'].setValue('oldPassword123');
    component.modifyPassForm.controls['newPassword'].setValue('newPassword123');
    component.modifyPassForm.controls['confirmPassword'].setValue('newPassword123');

    component.send();

    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should show alert on error', () => {
    spyOn(window, 'alert');
    component.modifyPassForm.controls['oldPassword'].setValue('oldPassword123');
    component.modifyPassForm.controls['newPassword'].setValue('newPassword123');
    component.modifyPassForm.controls['confirmPassword'].setValue('differentPassword');

    component.send();

    expect(window.alert).toHaveBeenCalledWith("Formulaire invalide");
  });
});