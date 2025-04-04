import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/User';
import { HttpResponse } from '@angular/common/http'; // Importer HttpResponse si nécessaire

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    // Initialisation si nécessaire
    // Charger les informations de l'utilisateur si nécessaire
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      this.successMessage = null;
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse e-mail valide.';
      this.successMessage = null;
      return;
    }

    if (!this.isValidPhoneNumber(this.numtel)) {
      this.errorMessage = 'Le numéro de téléphone doit comporter 8 chiffres.';
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
      // Appeler le service pour mettre à jour l'utilisateur
      this.userService.updateUser(updatedUser).subscribe(
        (response: HttpResponse<any>) => { // Typage de la réponse
          this.successMessage = 'Profil mis à jour avec succès.';
          this.errorMessage = null;
        },
        (error: any) => { // Typage de l'erreur
          this.errorMessage = 'Erreur lors de la mise à jour du profil.';
          this.successMessage = null;
        }
      );
    }
  }

  // Nouvelle méthode pour récupérer le mot de passe
  requestPasswordReset(): void {
    if (this.email) {
      this.authService.sendPasswordResetEmail(this.email).subscribe(
        (response: HttpResponse<any>) => { // Typage de la réponse
          this.successMessage = 'Un e-mail de réinitialisation a été envoyé.';
          this.errorMessage = null;
        },
        (error: any) => { // Typage de l'erreur
          this.errorMessage = 'Erreur lors de l\'envoi de l\'e-mail de réinitialisation.';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Veuillez entrer un e-mail valide.';
      this.successMessage = null;
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
