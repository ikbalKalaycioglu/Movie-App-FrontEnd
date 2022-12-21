import { TestBed } from '@angular/core/testing';

import { StarImageService } from './star-image.service';

describe('StarImageService', () => {
  let service: StarImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
