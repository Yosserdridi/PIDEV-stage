import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostBackComponent } from './add-post-back.component';

describe('AddPostBackComponent', () => {
  let component: AddPostBackComponent;
  let fixture: ComponentFixture<AddPostBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPostBackComponent]
    });
    fixture = TestBed.createComponent(AddPostBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
