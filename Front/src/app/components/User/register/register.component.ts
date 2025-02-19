import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth-service.service';
import { User } from '../../../models/User';
import { Roles } from '../../../models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  id = '';
  numtel: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;
  passwordMismatch: boolean = false;
  invalidEmail: boolean = false;
  invalidPhoneNumber: boolean = false;

  constructor(
     private router: Router
  ) {}

  onSubmit() {
    this.passwordMismatch = this.password !== this.confirmPassword;
 

    if (this.passwordMismatch || this.invalidEmail || this.invalidPhoneNumber) {
      return; // Stop submission if validation fails
    }

    const newUser: User = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      numtel: this.numtel,
      id: this.id,
      mdp: this.password,
      role: Roles.DEFAULT
    };

 
  }
 
}
