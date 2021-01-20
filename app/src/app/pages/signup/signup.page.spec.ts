import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPage } from './signup.page';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [SignUpPage]
	})
		.compileComponents();
  });

  beforeEach(() => {
	fixture = TestBed.createComponent(SignUpPage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
