import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPfeInternshipComponent } from './deposit-pfe-internship.component';

describe('DepositPfeInternshipComponent', () => {
  let component: DepositPfeInternshipComponent;
  let fixture: ComponentFixture<DepositPfeInternshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositPfeInternshipComponent]
    });
    fixture = TestBed.createComponent(DepositPfeInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
