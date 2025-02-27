import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipdetailComponent } from './internshipdetail.component';

describe('InternshipdetailComponent', () => {
  let component: InternshipdetailComponent;
  let fixture: ComponentFixture<InternshipdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipdetailComponent]
    });
    fixture = TestBed.createComponent(InternshipdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
