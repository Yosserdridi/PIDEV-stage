import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateadminComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateadminComponent;
  let fixture: ComponentFixture<UpdateadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateadminComponent]
    });
    fixture = TestBed.createComponent(UpdateadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
