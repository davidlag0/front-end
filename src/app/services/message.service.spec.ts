import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should add a new message to the stack',
    inject([MessageService], (service: MessageService) => {

    service.add('test message');
    expect(service.messages).toEqual(['test message']);
  }));

  it('should clear all messages',
    inject([MessageService], (service: MessageService) => {

    service.clear();
    expect(service.messages).toEqual([]);
  }));
});
