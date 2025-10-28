import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEstadoMesaComponent } from './listado-estado-mesa.component';

describe('ListadoEstadoMesaComponent', () => {
  let component: ListadoEstadoMesaComponent;
  let fixture: ComponentFixture<ListadoEstadoMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoEstadoMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoEstadoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
