import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsSpComponent } from './postulations.component';

describe('PostulationsComponent', () => {
  let component: PostulationsSpComponent;
  let fixture: ComponentFixture<PostulationsSpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulationsSpComponent]
    });
    fixture = TestBed.createComponent(PostulationsSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
