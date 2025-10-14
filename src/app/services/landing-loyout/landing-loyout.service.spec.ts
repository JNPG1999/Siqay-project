import { TestBed } from '@angular/core/testing';

import { LandingLoyoutService } from './landing-loyout.service';

describe('LandingLoyoutService', () => {
  let service: LandingLoyoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingLoyoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
