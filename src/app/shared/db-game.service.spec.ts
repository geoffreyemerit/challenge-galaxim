import { TestBed } from '@angular/core/testing';

import { DbGameService } from './db-game.service';

describe('DbGameService', () => {
  let service: DbGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
