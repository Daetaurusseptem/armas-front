import { TestBed } from '@angular/core/testing';

import { WriteOrReadUserGuard } from './write-or-read-user.guard';

describe('WriteOrReadUserGuard', () => {
  let guard: WriteOrReadUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WriteOrReadUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
