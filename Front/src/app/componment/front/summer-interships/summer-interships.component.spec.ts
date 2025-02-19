import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerIntershipsComponent } from './summer-interships.component';

describe('SummerIntershipsComponent', () => {
  let component: SummerIntershipsComponent;
  let fixture: ComponentFixture<SummerIntershipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummerIntershipsComponent]
    });
    fixture = TestBed.createComponent(SummerIntershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
