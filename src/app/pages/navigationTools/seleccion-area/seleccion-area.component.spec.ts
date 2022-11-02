import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionAreaComponent } from './seleccion-area.component';

describe('SeleccionAreaComponent', () => {
  let component: SeleccionAreaComponent;
  let fixture: ComponentFixture<SeleccionAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
