import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assurez-vous que le chemin est correct
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private baseUrl = 'http://localhost:8080/api/users'; // Adjust the URL accordingly

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in using the AuthService
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      return true; // User is authenticated, allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // User is not authenticated, block access
    }
  }
}