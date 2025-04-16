import { TestBed } from '@angular/core/testing';

import { SummerService } from './summer.service';

describe('SummerService', () => {
  let service: SummerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
