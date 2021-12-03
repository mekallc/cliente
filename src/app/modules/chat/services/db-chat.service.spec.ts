import { TestBed } from '@angular/core/testing';

import { DbChatService } from './db-chat.service';

describe('DbChatService', () => {
  let service: DbChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
