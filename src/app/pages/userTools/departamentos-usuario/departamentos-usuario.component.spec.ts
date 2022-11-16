import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosUsuarioComponent } from './departamentos-usuario.component';

describe('DepartamentosUsuarioComponent', () => {
  let component: DepartamentosUsuarioComponent;
  let fixture: ComponentFixture<DepartamentosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
