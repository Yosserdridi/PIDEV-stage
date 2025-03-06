import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenanceFComponent } from './soutenance-f.component';

describe('SoutenanceFComponent', () => {
  let component: SoutenanceFComponent;
  let fixture: ComponentFixture<SoutenanceFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoutenanceFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoutenanceFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
