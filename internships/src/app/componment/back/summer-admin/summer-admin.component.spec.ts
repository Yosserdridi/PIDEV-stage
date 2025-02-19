import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerAdminComponent } from './summer-admin.component';

describe('SummerAdminComponent', () => {
  let component: SummerAdminComponent;
  let fixture: ComponentFixture<SummerAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummerAdminComponent]
    });
    fixture = TestBed.createComponent(SummerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
