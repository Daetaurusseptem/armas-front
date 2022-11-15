import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarExpedienteComponent } from './agregar-expediente.component';

describe('AgregarExpedienteComponent', () => {
  let component: AgregarExpedienteComponent;
  let fixture: ComponentFixture<AgregarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
