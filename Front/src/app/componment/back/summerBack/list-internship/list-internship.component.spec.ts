import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInternshipComponent } from './list-internship.component';

describe('ListInternshipComponent', () => {
  let component: ListInternshipComponent;
  let fixture: ComponentFixture<ListInternshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInternshipComponent]
    });
    fixture = TestBed.createComponent(ListInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
