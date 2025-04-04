
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AccountService } from '../../../services/account.service'; // Chemin correct
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modify-pass',
  templateUrl: './modify-pass.component.html',
  styleUrls: ['./modify-pass.component.css']
})
export class ModifyPassComponent implements OnInit {
  modifyPassForm!: FormGroup; // Utiliser le point d'exclamation
  username!: string; // Utiliser le point d'exclamation

  constructor(private authService:AuthService, private router: Router) {}

  ngOnInit(): void {
    this.modifyPassForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.passwordMatchValidator);

    // Récupérer le nom d'utilisateur de l'utilisateur connecté
    // this.accountService.user.subscribe(user => {
    //   if (user) {
    //     this.username = user.username;
    //   } else {
    //     this.router.navigate(['/signin']); // Rediriger si l'utilisateur n'est pas connecté
    //   }
    // });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return newPassword && confirmPassword && newPassword.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  public send(): void {
    if (this.modifyPassForm.valid) {
      const data = {
        oldPassword: this.modifyPassForm.value.oldPassword,
        newPassword: this.modifyPassForm.value.newPassword
      };

      this.authService.changepassword(data).subscribe((res) => {
        console.log("res",res)
        alert("Mot de passe changé avec succès");
        this.router.navigate(['/']);
      }, (error: any) => { // Spécifiez le type pour l'erreur
        alert("ancien mot de passe incorrect");
      });
    } else {
      alert("Formulaire invalide");
    }
  }

}