import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEstadoMesaComponent } from './registrar-estado-mesa.component';

describe('RegistrarEstadoMesaComponent', () => {
  let component: RegistrarEstadoMesaComponent;
  let fixture: ComponentFixture<RegistrarEstadoMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarEstadoMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarEstadoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
