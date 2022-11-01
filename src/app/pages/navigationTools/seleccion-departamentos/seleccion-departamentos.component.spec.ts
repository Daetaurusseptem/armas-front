import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDepartamentosComponent } from './seleccion-departamentos.component';

describe('SeleccionDepartamentosComponent', () => {
  let component: SeleccionDepartamentosComponent;
  let fixture: ComponentFixture<SeleccionDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionDepartamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
