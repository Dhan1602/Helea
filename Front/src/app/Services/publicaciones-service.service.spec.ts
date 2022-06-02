import { TestBed } from '@angular/core/testing';

import { PublicacionesService } from './publicaciones-service.service';

describe('PublicacionesServiceService', () => {
  let service: PublicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
