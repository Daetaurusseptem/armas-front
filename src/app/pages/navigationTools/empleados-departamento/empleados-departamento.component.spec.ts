import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosDepartamentoComponent } from './empleados-departamento.component';

describe('EmpleadosDepartamentoComponent', () => {
  let component: EmpleadosDepartamentoComponent;
  let fixture: ComponentFixture<EmpleadosDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadosDepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
