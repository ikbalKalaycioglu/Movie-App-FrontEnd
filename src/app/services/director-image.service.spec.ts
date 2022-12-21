import { TestBed } from '@angular/core/testing';

import { DirectorImageService } from './director-image.service';

describe('DirectorImageService', () => {
  let service: DirectorImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectorImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
