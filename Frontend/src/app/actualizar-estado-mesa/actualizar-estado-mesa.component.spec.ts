import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEstadoMesaComponent } from './actualizar-estado-mesa.component';

describe('ActualizarEstadoMesaComponent', () => {
  let component: ActualizarEstadoMesaComponent;
  let fixture: ComponentFixture<ActualizarEstadoMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarEstadoMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEstadoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
