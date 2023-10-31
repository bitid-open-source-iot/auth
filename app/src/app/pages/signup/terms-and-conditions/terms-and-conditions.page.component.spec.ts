import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditions.PageComponent } from './terms-and-conditions.page.component';

describe('TermsAndConditions.PageComponent', () => {
  let component: TermsAndConditions.PageComponent;
  let fixture: ComponentFixture<TermsAndConditions.PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditions.PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditions.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
