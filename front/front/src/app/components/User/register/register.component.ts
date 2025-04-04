import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { UserSignupDTO } from '../../../models/user-signup-dto.model'; // Ensure this path is correct

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string = ''; // This should map to your displayName
  prenom: string = ''; // This should map to your firstName
  email: string = '';
  username: string = '';
  numtel: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;
  passwordMismatch: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.passwordMismatch = this.password !== this.confirmPassword;

    if (this.passwordMismatch) {
      return; // Stop submission if passwords do not match
    }

    // Create the UserSignupDTO object
    const newUser: UserSignupDTO = {
      username: this.username, // Assuming username is the email
      password: this.password,
      email: this.email,
      firstName: this.prenom, // Mapping to firstName
      lastName: this.nom, // Assuming you might allow this to be optional
      // numtel: this.numtel,

    };

    // Call the registration service
    this.userService.register(newUser).subscribe({
      next: (response) => {
        console.log("reponse register",response)
        this.authService.setUser(response); // Store user data in AuthService
        this.router.navigate(['/login']); // Navigate to profile page on success
      },
      error: (err) => {
        // this.errorMessage = err.error.message || 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }
}
