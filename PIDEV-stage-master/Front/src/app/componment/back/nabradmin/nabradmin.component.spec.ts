import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabradminComponent } from './nabradmin.component';

describe('NabradminComponent', () => {
  let component: NabradminComponent;
  let fixture: ComponentFixture<NabradminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NabradminComponent]
    });
    fixture = TestBed.createComponent(NabradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
