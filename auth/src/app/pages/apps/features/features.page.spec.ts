import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeaturesPage } from './features.page';

describe('AppFeaturesPage', () => {
  let component: AppFeaturesPage;
  let fixture: ComponentFixture<AppFeaturesPage>;

  beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [AppFeaturesPage]
	})
		.compileComponents();
  });

  beforeEach(() => {
	fixture = TestBed.createComponent(AppFeaturesPage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
