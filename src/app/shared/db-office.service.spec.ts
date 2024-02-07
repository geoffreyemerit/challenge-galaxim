import { TestBed } from '@angular/core/testing';

import { DbOfficeService } from './db-office.service';

describe('DbOfficeService', () => {
  let service: DbOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
