import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllTasksComponent } from './user-all-tasks.component';

describe('UserAllTasksComponent', () => {
  let component: UserAllTasksComponent;
  let fixture: ComponentFixture<UserAllTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAllTasksComponent]
    });
    fixture = TestBed.createComponent(UserAllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
