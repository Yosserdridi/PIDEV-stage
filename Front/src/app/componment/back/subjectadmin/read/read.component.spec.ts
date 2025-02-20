import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadadminComponent } from './read.component';

describe('ReadComponent', () => {
  let component: ReadadminComponent;
  let fixture: ComponentFixture<ReadadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadadminComponent]
    });
    fixture = TestBed.createComponent(ReadadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
