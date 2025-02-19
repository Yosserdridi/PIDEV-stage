import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string | null = null; // To store error messages

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
 
  }

  // Method to clear the error message when user starts typing
  onEmailInput(): void {
    this.errorMessage = null;
  }
}
