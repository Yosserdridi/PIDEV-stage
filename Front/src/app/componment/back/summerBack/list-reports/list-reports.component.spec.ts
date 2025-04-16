import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportsComponent } from './list-reports.component';

describe('ListReportsComponent', () => {
  let component: ListReportsComponent;
  let fixture: ComponentFixture<ListReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListReportsComponent]
    });
    fixture = TestBed.createComponent(ListReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
