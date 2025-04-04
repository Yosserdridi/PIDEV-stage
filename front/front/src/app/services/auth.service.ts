import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserSignupDTO } from '../models/user-signup-dto.model'; // Ajustez le chemin si nécessaire
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8222/api/auth'; // Base URL pour l'API
  private signupUrl = `${this.baseUrl}/signup/employee`;
  private loginUrl = `${this.baseUrl}/signIn`;
  private signupEntrepriseUrl = `${this.baseUrl}/signup/entreprise`;

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  // Registration method
  register(userSignupDTO: UserSignupDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userSignupDTO).pipe(
      tap((response: any) => {
        this.setUser(response.user); // Assuming the response contains user data
        this.router.navigate(['/profile']); // Navigate to profile upon successful registration
      }),
      catchError(this.handleError)
    );
  }

  // Updates the current user
  setUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user)); // Persist user data
  }

  // Récupère l'utilisateur courant
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Efface l'utilisateur courant
  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }


  // Connexion de l'utilisateur
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap((response) => {
        const token = response.accessToken;
        localStorage.setItem('access_token', token);
        this.setUser(response.user); // Assuming the response contains user data
        this.router.navigate(['/admin/admindashboard']); // Navigate to admin dashboard upon login
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred during authentication.', error);
        return throwError('Authentication failed.');
      })
    );
  }

  // Inscription d'un employé
  signupEmployee(user: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(error => {
        console.error('An error occurred during signup:', error);
        return throwError(error);
      })
    );
  }

  // Inscription d'une entreprise
  signupEntreprise(user: any): Observable<any> {
    return this.http.post<any>(this.signupEntrepriseUrl, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(error => {
        console.error('An error occurred during entreprise signup:', error);
        return throwError(error);
      })
    );
  }

  // Récupération du token d'authentification
  getAuthToken(): string {
    const token = localStorage.getItem('token');
    console.log('SERVICE token is: ' + token);
    return token || '';
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token'); // Vérifie si l'utilisateur est authentifié
  }

  // Déconnexion de l'utilisateur
  signout() {
    localStorage.removeItem('access_token');
    this.clearCurrentUser(); // Nettoie les informations de l'utilisateur
    this.router.navigate(['/landing']); // Redirige vers la page de landing
  }

  // Méthode pour envoyer un e-mail de réinitialisation de mot de passe
  sendPasswordResetEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}/reset-password`, { email })
        .pipe(catchError(this.handleError)); // Utilisation de handleError
  }

  // Méthode pour récupérer le mot de passe
  forgotPassword(email: string): Observable<any> {
    return this.http.post('/api/forgot-password', { email });
  }
  //Méthode de Modification le mot de passe
  ModifyPass(oldPassword: string, newPassword: string) {
    return this.http.post('/api/modify-pass', { oldPassword, newPassword });
  }

  // Méthode pour gérer les erreurs
  private handleError(error: HttpErrorResponse) {
    // Logique de gestion d'erreur
    console.error('Une erreur s\'est produite:', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }

  signin(body: any): Observable<any> {
    return this.http.post<any>
      (`${this.baseUrl}/signin`,body
    );
  }

  forgetpassword(email:any): Observable<any> {

    return this.http.post<any>
      (`${this.baseUrl}/forgetpassword?email=${email}`,{} );
  }
  savepassword(newPassword:any,resettoken:any): Observable<any> {

    return this.http.post<any>
      (`${this.baseUrl}/savePassword/${resettoken}?newPassword=${newPassword}`,{} );
  }

  changepassword(data: any): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Ajouter le token dans les headers
      'Content-Type': 'application/json' // Assurez-vous d'envoyer du JSON
    });

    return this.http.post<any>(`${this.baseUrl}/change-Password`, data, { headers });
  }



}
