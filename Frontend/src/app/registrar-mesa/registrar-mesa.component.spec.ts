import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMesaComponent } from './registrar-mesa.component';

describe('RegistrarMesaComponent', () => {
  let component: RegistrarMesaComponent;
  let fixture: ComponentFixture<RegistrarMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
