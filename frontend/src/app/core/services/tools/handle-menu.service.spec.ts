import { TestBed } from '@angular/core/testing';

import { HandleMenuService } from './handle-menu.service';

describe('HandleMenuService', () => {
  let service: HandleMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
