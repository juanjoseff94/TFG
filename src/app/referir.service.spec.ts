import { TestBed } from '@angular/core/testing';

import { ReferirService } from './referir.service';

describe('ReferirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferirService = TestBed.get(ReferirService);
    expect(service).toBeTruthy();
  });
});
