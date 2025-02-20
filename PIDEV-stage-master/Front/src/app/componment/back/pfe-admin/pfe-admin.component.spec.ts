import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfeAdminComponent } from './pfe-admin.component';

describe('PfeAdminComponent', () => {
  let component: PfeAdminComponent;
  let fixture: ComponentFixture<PfeAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PfeAdminComponent]
    });
    fixture = TestBed.createComponent(PfeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
