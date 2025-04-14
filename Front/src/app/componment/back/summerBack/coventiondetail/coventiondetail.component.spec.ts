import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoventiondetailComponent } from './coventiondetail.component';

describe('CoventiondetailComponent', () => {
  let component: CoventiondetailComponent;
  let fixture: ComponentFixture<CoventiondetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoventiondetailComponent]
    });
    fixture = TestBed.createComponent(CoventiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
