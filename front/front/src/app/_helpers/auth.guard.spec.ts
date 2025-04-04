import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Assurez-vous que le chemin est correct
import { AuthService } from '../services/auth.service'; // Vérifiez le chemin

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: jasmine.createSpy('isLoggedIn'), // Mock de la méthode isLoggedIn
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'), // Mock de la méthode navigate
          },
        },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(true); // Simule un utilisateur connecté
    const result = authGuard.canActivate();
    expect(result).toBeTrue(); // Vérifie que l'accès est autorisé
    expect(router.navigate).not.toHaveBeenCalled(); // Vérifie que la redirection n'a pas eu lieu
  });

  it('should redirect to login if user is not logged in', () => {
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(false); // Simule un utilisateur non connecté
    const result = authGuard.canActivate();
    expect(result).toBeFalse(); // Vérifie que l'accès est refusé
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Vérifie que la redirection a eu lieu
  });
});