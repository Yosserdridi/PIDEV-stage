import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTeacherAdminComponent } from './get-teacher-admin.component';

describe('GetTeacherAdminComponent', () => {
  let component: GetTeacherAdminComponent;
  let fixture: ComponentFixture<GetTeacherAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetTeacherAdminComponent]
    });
    fixture = TestBed.createComponent(GetTeacherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
