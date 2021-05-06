import { TestBed } from '@angular/core/testing';

import { CreateGraphService } from './create-graph.service';

describe('CreateGraphService', () => {
  let service: CreateGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
