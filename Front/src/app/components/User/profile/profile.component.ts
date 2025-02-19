
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  email: string = '';
  numtel: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  id: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void { 
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.successMessage = null;
      return;
    }
  
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      this.successMessage = null;
      return;
    }
  
    if (!this.isValidPhoneNumber(this.numtel)) {
      this.errorMessage = 'Phone number must be 8 digits';
      this.successMessage = null;
      return;
    }
  
    if (this.id) {
      const updatedUser: User = {
        email: this.email,
        numtel: this.numtel,
        mdp: this.password,
        id: this.id
      };
  
  
      
    }
  }
  

  isValidEmail(email: string): boolean {
    const emailRegex = /.+@.+\..+/;
    return emailRegex.test(email);
  }

  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[0-9]{8}$/;
    return phoneRegex.test(phone);
  }
}