import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteEmpleadoComponent } from './expediente-empleado.component';

describe('ExpedienteEmpleadoComponent', () => {
  let component: ExpedienteEmpleadoComponent;
  let fixture: ComponentFixture<ExpedienteEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
