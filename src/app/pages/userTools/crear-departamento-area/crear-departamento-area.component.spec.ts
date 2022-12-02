import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDepartamentoAreaComponent } from './crear-departamento-area.component';

describe('CrearDepartamentoAreaComponent', () => {
  let component: CrearDepartamentoAreaComponent;
  let fixture: ComponentFixture<CrearDepartamentoAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDepartamentoAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDepartamentoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
