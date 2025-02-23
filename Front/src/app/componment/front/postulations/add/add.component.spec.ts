import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddPComponent;
  let fixture: ComponentFixture<AddPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPComponent]
    });
    fixture = TestBed.createComponent(AddPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
