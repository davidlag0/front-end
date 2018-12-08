import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LayoutService {
  public toggleSidenav: EventEmitter<any> = new EventEmitter();
}
