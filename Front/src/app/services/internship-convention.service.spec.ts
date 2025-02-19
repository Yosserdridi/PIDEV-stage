import { TestBed } from '@angular/core/testing';

import { InternshipConventionService } from './internship-convention.service';

describe('InternshipConventionService', () => {
  let service: InternshipConventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternshipConventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
