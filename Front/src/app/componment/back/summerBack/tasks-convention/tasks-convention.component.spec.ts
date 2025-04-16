import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksConventionComponent } from './tasks-convention.component';

describe('TasksConventionComponent', () => {
  let component: TasksConventionComponent;
  let fixture: ComponentFixture<TasksConventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksConventionComponent]
    });
    fixture = TestBed.createComponent(TasksConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
