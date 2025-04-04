import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { UserSignupDTO } from '../models/user-signup-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8222/api/auth'; // URL de base

  constructor(private http: HttpClient) {} // Injection de HttpClient
// Registration method
register(user: UserSignupDTO): Observable<any> {
  return this.http.post(`${this.baseUrl}/signup`, user
    , {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }).pipe(
    catchError(this.handleError)
  );
}
  // Mise à jour d'un utilisateur
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${user.id}`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Récupération des détails d'un utilisateur par ID
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Récupération de tous les utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  // Suppression d'un utilisateur par ID
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }
}
