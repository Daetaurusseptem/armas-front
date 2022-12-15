import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoExpedienteComponent } from './editar-tipo-expediente.component';

describe('EditarTipoExpedienteComponent', () => {
  let component: EditarTipoExpedienteComponent;
  let fixture: ComponentFixture<EditarTipoExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
