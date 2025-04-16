import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionUserComponent } from './convention-user.component';

describe('ConventionUserComponent', () => {
  let component: ConventionUserComponent;
  let fixture: ComponentFixture<ConventionUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConventionUserComponent]
    });
    fixture = TestBed.createComponent(ConventionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
