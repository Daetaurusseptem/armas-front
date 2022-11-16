import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoExpedientesComponent } from './crear-tipo-expedientes.component';

describe('CrearTipoExpedientesComponent', () => {
  let component: CrearTipoExpedientesComponent;
  let fixture: ComponentFixture<CrearTipoExpedientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTipoExpedientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
