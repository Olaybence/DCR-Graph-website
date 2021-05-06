import { TestBed } from '@angular/core/testing';

import { OpenLocalService } from './open-local.service';

describe('OpenLocalService', () => {
  let service: OpenLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
