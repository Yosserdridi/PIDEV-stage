import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service'; // Chemin correct
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  token?: string; // Utilisation de l'opérateur de non-null assertion
  fg!: FormGroup; // Formulaire pour la demande de code
  fgreset!: FormGroup; // Formulaire pour la réinitialisation du mot de passe
  showResetPasswordCard: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    // Vérifiez si l'utilisateur n'est pas connecté
  if (!this.accountService.isUserLoggedIn()) {
    this.router.navigate(['/signin']); // Redirigez vers la page de connexion
  }
    // Initialisation du formulaire pour la demande de code
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), // Validation de l'email
      // recaptcha: new FormControl(null, [Validators.required]) // Validation reCAPTCHA (si nécessaire)
    });

    // Initialisation du formulaire pour la réinitialisation du mot de passe
    this.fgreset = new FormGroup({
      code: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.passwordMatchValidator);
  }

  // Validator pour vérifier si les mots de passe correspondent
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return newPassword && confirmPassword && newPassword.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  // Soumission du formulaire pour demander le code
  public submitfg(): void {
    if (this.fg.valid) {
      this.accountService.userForgetPassword(this.fg.value.email).subscribe(
        (response) => { 
          this.showResetPasswordCard = true; // Affiche le formulaire de réinitialisation
          alert("Code envoyé avec succès à votre mail");
        },
        (error) => {
          console.error(error); // Affichez l'erreur dans la console pour le débogage
          alert("Erreur lors de l'envoi du code, veuillez vérifier votre e-mail.");
        }
      );
    } else {
      alert("Formulaire invalide");
    }
  }

  // Soumission du formulaire pour réinitialiser le mot de passe
  public submitfgreset(): void {
    if (this.fgreset.valid) {
      const formData = {
        newPassword: this.fgreset.value.newPassword,
        code: this.fgreset.value.code,
      };

      this.accountService.forgetPasswordbyemail(this.fg.value.email, formData).subscribe(
        (response) => {
          alert("Mot de passe changé avec succès");
          this.router.navigate(['/signin']); // Redirection vers la page de connexion
        },
        (error) => alert("Erreur lors du changement de mot de passe")
      );
    } else {
      alert("Formulaire invalide");
    }
  }

  // Renvoie un nouveau code de vérification
  public resendcode(event: Event): void {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    this.accountService.userForgetPassword(this.fg.value.email).subscribe(
      (response) => {
        alert("Code de vérification renvoyé avec succès.");
      },
      (error) => {
        alert("Erreur lors de l'envoi du code.");
      }
    );
  }
}