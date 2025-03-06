import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIFDetailsComponent } from './cif-details.component';

describe('CIFDetailsComponent', () => {
  let component: CIFDetailsComponent;
  let fixture: ComponentFixture<CIFDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CIFDetailsComponent]
    });
    fixture = TestBed.createComponent(CIFDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
