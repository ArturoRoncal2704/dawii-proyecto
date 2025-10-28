import { TestBed } from '@angular/core/testing';

import { EstadoMesaService } from './estado-mesa.service';

describe('EstadoMesaService', () => {
  let service: EstadoMesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoMesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
