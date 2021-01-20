import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowAccessPage } from './allow-access.page';

describe('AllowAccessPage', () => {
  let component: AllowAccessPage;
  let fixture: ComponentFixture<AllowAccessPage>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ AllowAccessPage ]
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(AllowAccessPage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
