import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from '../services/auth.interceptor';
import { AuthService } from '../services/auth.service'; // Assurez-vous que le chemin est correct
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // Importez HttpClient

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let httpClient: HttpClient; // Déclarez httpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService, // Ajoutez le service d'authentification
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient); // Initialisez httpClient ici
  });

  afterEach(() => {
    httpTestingController.verify(); // Vérifiez qu'aucune requête HTTP n'est en attente
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token exists', () => {
    const token = 'test-token';
    spyOn(authService, 'getAuthToken').and.returnValue(token); // Simuler le retour du token

    // Effectuer une requête de test
    httpClient.get('/test-endpoint').subscribe(); // Utilisez httpClient ici

    // Vérifiez que l'en-tête Authorization a été ajouté
    const req = httpTestingController.expectOne('/test-endpoint');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush({}); // Répondre à la requête
  });

  it('should not add Authorization header if token does not exist', () => {
    spyOn(authService, 'getAuthToken').and.returnValue(''); // Retourne une chaîne vide au lieu de null

    httpClient.get('/test-endpoint').subscribe(); // Utilisez httpClient ici

    const req = httpTestingController.expectOne('/test-endpoint');
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({}); // Répondre à la requête
  });
});