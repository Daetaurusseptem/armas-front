import { TestBed } from '@angular/core/testing';

import { EmpresaPermisoGuard } from './empresa-permiso.guard';

describe('EmpresaPermisoGuard', () => {
  let guard: EmpresaPermisoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpresaPermisoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
