import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostulationsComponent } from './allpostulations.component';

describe('AllpostulationsComponent', () => {
  let component: AllPostulationsComponent;
  let fixture: ComponentFixture<AllPostulationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPostulationsComponent]
    });
    fixture = TestBed.createComponent(AllPostulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
