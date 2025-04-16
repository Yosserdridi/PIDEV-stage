import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionDetailUserComponent } from './convention-detail-user.component';

describe('ConventionDetailUserComponent', () => {
  let component: ConventionDetailUserComponent;
  let fixture: ComponentFixture<ConventionDetailUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConventionDetailUserComponent]
    });
    fixture = TestBed.createComponent(ConventionDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
