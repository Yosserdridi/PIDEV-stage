import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AccountService } from '../../../services/account.service'; // Chemin correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  forgetPassForm!: FormGroup; // Utiliser le point d'exclamation
  username!: string; // Utiliser le point d'exclamation

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.forgetPassForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.passwordMatchValidator);

    // Récupérer le nom d'utilisateur de l'utilisateur connecté
    this.accountService.user.subscribe(user => {
      if (user) {
        this.username = user.username;
      } else {
        this.router.navigate(['/signin']); // Rediriger si l'utilisateur n'est pas connecté
      }
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return newPassword && confirmPassword && newPassword.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  public send(): void {
    if (this.forgetPassForm.valid) {
      const formData = {
        oldPassword: this.forgetPassForm.value.oldPassword,
        newPassword: this.forgetPassForm.value.newPassword
      };

      this.accountService.forgetPasswordbyemail(this.username, formData).subscribe(() => {
        alert("Mot de passe changé avec succès");
        this.router.navigate(['/signin']);
      }, (error: any) => { // Spécifiez le type pour l'erreur
        alert("Erreur lors du changement de mot de passe");
      });
    } else {
      alert("Formulaire invalide");
    }
  }
}