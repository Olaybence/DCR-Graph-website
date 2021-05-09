import { TestBed } from '@angular/core/testing';

import { SharedGraphService } from './shared-graph.service';

describe('SharedGraphService', () => {
  let service: SharedGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
