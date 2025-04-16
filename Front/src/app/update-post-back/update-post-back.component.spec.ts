import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostBackComponent } from './update-post-back.component';

describe('UpdatePostBackComponent', () => {
  let component: UpdatePostBackComponent;
  let fixture: ComponentFixture<UpdatePostBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePostBackComponent]
    });
    fixture = TestBed.createComponent(UpdatePostBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
