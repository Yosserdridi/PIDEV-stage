import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavepasswordComponent } from './savepassword.component';

describe('SavepasswordComponent', () => {
  let component: SavepasswordComponent;
  let fixture: ComponentFixture<SavepasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavepasswordComponent]
    });
    fixture = TestBed.createComponent(SavepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
