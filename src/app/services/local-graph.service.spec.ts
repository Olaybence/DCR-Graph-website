import { TestBed } from '@angular/core/testing';

import { LocalGraphService } from './local-graph.service';

describe('LocalGraphService', () => {
  let service: LocalGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
