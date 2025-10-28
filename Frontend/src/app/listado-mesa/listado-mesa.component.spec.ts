import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMesaComponent } from './listado-mesa.component';

describe('ListadoMesaComponent', () => {
  let component: ListadoMesaComponent;
  let fixture: ComponentFixture<ListadoMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
