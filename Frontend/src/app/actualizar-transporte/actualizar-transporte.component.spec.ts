import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTransporteComponent } from './actualizar-transporte.component';

describe('ActualizarTransporteComponent', () => {
  let component: ActualizarTransporteComponent;
  let fixture: ComponentFixture<ActualizarTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarTransporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
