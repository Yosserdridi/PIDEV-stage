import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Assurez-vous que le chemin est correct

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    console.log('Token is: ' + token);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Utilisez 'Bearer' pour le format standard
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Redirigez l'utilisateur vers la page de déconnexion ou de connexion
          console.error('Unauthorized access - redirecting to login');
          // Ici, vous pouvez ajouter la logique pour rediriger l'utilisateur
        }
        return throwError(err);
      })
    );
  }
}