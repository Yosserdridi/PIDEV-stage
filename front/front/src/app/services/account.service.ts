import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api'; // Remplacez par votre URL d'API
  private isLoggedInKey = 'isLoggedIn'; // Exemple de clé

  // Créer un BehaviorSubject pour l'utilisateur
  private userSubject = new BehaviorSubject<any>(null);
  user = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem(this.isLoggedInKey); // Vérifie si la clé existe
  }

  userForgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  forgetPasswordbyemail(email: string, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, ...formData });
  }

  // Méthode pour mettre à jour l'utilisateur
  setUser(user: any): void {
    this.userSubject.next(user);
  }
}