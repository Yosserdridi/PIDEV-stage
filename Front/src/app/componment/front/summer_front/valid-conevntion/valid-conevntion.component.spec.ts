import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidConevntionComponent } from './valid-conevntion.component';

describe('ValidConevntionComponent', () => {
  let component: ValidConevntionComponent;
  let fixture: ComponentFixture<ValidConevntionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidConevntionComponent]
    });
    fixture = TestBed.createComponent(ValidConevntionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
