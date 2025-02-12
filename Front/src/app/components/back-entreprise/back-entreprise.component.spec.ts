import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEntrepriseComponent } from './back-entreprise.component';

describe('BackEntrepriseComponent', () => {
  let component: BackEntrepriseComponent;
  let fixture: ComponentFixture<BackEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
