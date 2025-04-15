import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatinvalidComponent } from './statinvalid.component';

describe('StatinvalidComponent', () => {
  let component: StatinvalidComponent;
  let fixture: ComponentFixture<StatinvalidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatinvalidComponent]
    });
    fixture = TestBed.createComponent(StatinvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
