import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Simuler une réponse de backend
    if (request.url.endsWith('/api/login') && request.method === 'POST') {
      const { username, password } = request.body;

      // Remplacez cette logique par une vérification de l'utilisateur réel
      if (username === 'user' && password === 'password') {
        return of(new HttpResponse({ status: 200, body: { token: 'fake-jwt-token' } })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 401 })).pipe(delay(500));
      }
    }
    return next.handle(request);
  }
}