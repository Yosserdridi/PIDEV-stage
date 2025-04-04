import { TestBed } from '@angular/core/testing';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http'; // Ajoutez HttpResponse ici
import { JwtInterceptor } from './jwt.interceptor';
import { Observable, of } from 'rxjs';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor; // Changez le type en JwtInterceptor

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor // Utilisez directement JwtInterceptor
      ]
    });
    interceptor = TestBed.inject(JwtInterceptor); // Injectez JwtInterceptor
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept requests', () => {
    const req = new HttpRequest('GET', '/api/test');
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        return of(new HttpResponse({ status: 200 })); // Mock behaviour
      }
    };

    interceptor.intercept(req, next).subscribe(event => {
      expect(event).toBeTruthy(); // Vérifiez que quelque chose a été renvoyé
    });
  });
});