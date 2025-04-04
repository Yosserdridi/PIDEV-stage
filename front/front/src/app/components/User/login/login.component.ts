// src/app/components/User/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../../services/auth.service'; // Chemin correct

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  rememberMe: boolean = false; 
  user = {
    username: '',
    password: ''
  };
  focus: boolean = false;  // Pour le champ email
  focus1: boolean = false; // Pour le champ mot de passe

  constructor(private authService: AuthService, private router: Router) { }
  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.user.username, this.user.password).subscribe(
        response => {
          // Gérer la réponse de connexion
          console.log('Connexion réussie', response);
          const accessToken = response.accessToken;
          const refreshToken = response.refreshToken;

          // Stockage des tokens selon le choix de l'utilisateur
          if (this.rememberMe) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          } else {
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
          }

          // Redirection selon les rôles de l'utilisateur
          this.redirectUserBasedOnRole(response.authorities);
                },
        error => {
          this.loginError = 'Échec de la connexion. Vérifiez vos identifiants.';
          console.error('Erreur de connexion:', error);
        }
      );
    }
  }

  ngOnInit() {}

  onRememberMeChange(): void {
    console.info('Remember me value changed:', this.rememberMe);
  }

  onSubmit(loginForm?: any) {
    // if (loginForm!.valid) {
      
let data={
   username : this.user.username,
   password : this.user.password
}
      this.authService.signin(data).subscribe(
        (res: any) => {
          console.log("res",res)
          console.log('User logged in successfully!');
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('refreshtoken', res.refreshToken);
          localStorage.setItem('userconnected', JSON.stringify(res));
          localStorage.setItem("state","0");
          this.router.navigateByUrl("/home")
          // const accessToken = response.accessToken;
          // const refreshToken = response.refreshToken;

          // // Stockage des tokens selon le choix de l'utilisateur
          // if (this.rememberMe) {
          //   localStorage.setItem('accessToken', accessToken);
          //   localStorage.setItem('refreshToken', refreshToken);
          // } else {
          //   sessionStorage.setItem('accessToken', accessToken);
          //   sessionStorage.setItem('refreshToken', refreshToken);
          // }

          // Redirection selon les rôles de l'utilisateur
          // this.redirectUserBasedOnRole(response.authorities);
        },
        (error: any) => {
          // Gestion des erreurs
          // if (error.status === 401) {
          //   this.loginError = 'Identifiants invalides. Veuillez réessayer.';
          // } else {
          //   this.loginError = 'Une erreur est survenue. Veuillez réessayer.';
          // }
          console.error('Login error:', error);
          if(error){
            alert("Identifiants invalides. Veuillez réessayer.")
          }
        }
      );
    // } else {
    //   console.log('Form is invalid. Please check your inputs.');
    // }
  }



  private redirectUserBasedOnRole(authorities: any[]): void {
    const userAuthorities = authorities.map(authority => authority.authority);
    
    if (userAuthorities.includes("ADMIN")) {
      this.router.navigate(['admin']);
    } else if (userAuthorities.includes("Entreprise")) {
      this.router.navigate(['entreprise_dashboard']);
    } else {
      this.router.navigate(['user_dashboard']);
    }
  }
  // Méthode pour rediriger vers la page de mot de passe oublié
  onForgotPassword() {
    console.log("forget")
    this.router.navigate(['/forgetpassword']);
  }
  //Méthode pour modify motpass 
  onModifyPass() {
    this.router.navigate(['/modify-pass']);
  }
}
