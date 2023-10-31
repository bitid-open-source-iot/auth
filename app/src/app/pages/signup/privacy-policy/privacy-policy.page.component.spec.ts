import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicy.PageComponent } from './privacy-policy.page.component';

describe('PrivacyPolicy.PageComponent', () => {
  let component: PrivacyPolicy.PageComponent;
  let fixture: ComponentFixture<PrivacyPolicy.PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicy.PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicy.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
