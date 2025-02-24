import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipConventionComponent } from './internship-convention.component';

describe('InternshipConventionComponent', () => {
  let component: InternshipConventionComponent;
  let fixture: ComponentFixture<InternshipConventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipConventionComponent]
    });
    fixture = TestBed.createComponent(InternshipConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
