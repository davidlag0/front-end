import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentriesComponent } from './dataentries.component';

describe('DataentriesComponent', () => {
  let component: DataentriesComponent;
  let fixture: ComponentFixture<DataentriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataentriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
