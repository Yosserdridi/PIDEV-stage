import { TestBed } from '@angular/core/testing';

import { IntershipOfferService } from './intership-offer-services.service';

describe('IntershipOfferServicesService', () => {
  let service: IntershipOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntershipOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
