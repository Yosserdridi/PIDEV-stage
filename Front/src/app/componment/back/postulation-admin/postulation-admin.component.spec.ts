import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationAdminComponent } from './postulation-admin.component';

describe('PostulationAdminComponent', () => {
  let component: PostulationAdminComponent;
  let fixture: ComponentFixture<PostulationAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulationAdminComponent]
    });
    fixture = TestBed.createComponent(PostulationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
