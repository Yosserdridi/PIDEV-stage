import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateadminComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateadminComponent;
  let fixture: ComponentFixture<CreateadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateadminComponent]
    });
    fixture = TestBed.createComponent(CreateadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
