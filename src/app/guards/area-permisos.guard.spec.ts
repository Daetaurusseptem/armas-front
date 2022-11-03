import { TestBed } from '@angular/core/testing';

import { AreaPermisosGuard } from './area-permisos.guard';

describe('AreaPermisosGuard', () => {
  let guard: AreaPermisosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AreaPermisosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
