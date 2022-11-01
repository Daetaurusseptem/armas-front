import { TestBed } from '@angular/core/testing';

import { AdminOrUserGuard } from './admin-or-user.guard';

describe('AdminOrUserGuard', () => {
  let guard: AdminOrUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOrUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
