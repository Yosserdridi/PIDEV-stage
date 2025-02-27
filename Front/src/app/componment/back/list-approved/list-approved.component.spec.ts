import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApprovedComponent } from './list-approved.component';

describe('ListApprovedComponent', () => {
  let component: ListApprovedComponent;
  let fixture: ComponentFixture<ListApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListApprovedComponent]
    });
    fixture = TestBed.createComponent(ListApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
