import { TestBed } from '@angular/core/testing';

import { LoginChildrenService } from './login-children.service';

describe('LoginChildrenService', () => {
  let service: LoginChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginChildrenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
