import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { UserSignupDTO } from '../models/user-signup-dto.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should register a user', () => {
    const dummyUser: UserSignupDTO = {
      username: 'sirine',
      displayName: 'hamzaoui',
      email: 'sirine.hamzaoui@esprit.tn',
      
      numtel: '92523032',
      password: '123456' // Ensure this matches your UserSignupDTO definition
      ,
      firstName: '',
      lastName: ''
    };

    service.register(dummyUser).subscribe(response => {
      expect(response).toEqual({ success: true }); // Adjust according to your API response
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/register');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true }); // Simulate a successful response
  });

  afterEach(() => {
    httpMock.verify();
  });
});