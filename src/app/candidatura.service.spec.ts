import { TestBed } from '@angular/core/testing';

import { CandidaturaService } from './candidatura.service';

describe('CandidaturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidaturaService = TestBed.get(CandidaturaService);
    expect(service).toBeTruthy();
  });
});
