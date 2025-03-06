import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArchivedComponent } from './list-archived.component';

describe('ListArchivedComponent', () => {
  let component: ListArchivedComponent;
  let fixture: ComponentFixture<ListArchivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArchivedComponent]
    });
    fixture = TestBed.createComponent(ListArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
