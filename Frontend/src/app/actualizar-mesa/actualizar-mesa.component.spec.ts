import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMesaComponent } from './actualizar-mesa.component';

describe('ActualizarMesaComponent', () => {
  let component: ActualizarMesaComponent;
  let fixture: ComponentFixture<ActualizarMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
