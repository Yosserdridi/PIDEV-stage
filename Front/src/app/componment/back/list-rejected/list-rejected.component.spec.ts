import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRejectedComponent } from './list-rejected.component';

describe('ListRejectedComponent', () => {
  let component: ListRejectedComponent;
  let fixture: ComponentFixture<ListRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRejectedComponent]
    });
    fixture = TestBed.createComponent(ListRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
