import { TestBed } from '@angular/core/testing';

import { PfeInternshipService } from './pfe-internship.service';

describe('PfeInternshipService', () => {
  let service: PfeInternshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfeInternshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
