import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfeIntershipsComponent } from './pfe-interships.component';

describe('PfeIntershipsComponent', () => {
  let component: PfeIntershipsComponent;
  let fixture: ComponentFixture<PfeIntershipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PfeIntershipsComponent]
    });
    fixture = TestBed.createComponent(PfeIntershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
