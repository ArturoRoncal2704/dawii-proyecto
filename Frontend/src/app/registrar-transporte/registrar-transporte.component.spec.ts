import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTransporteComponent } from './registrar-transporte.component';

describe('RegistrarTransporteComponent', () => {
  let component: RegistrarTransporteComponent;
  let fixture: ComponentFixture<RegistrarTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarTransporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
