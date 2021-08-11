import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsAndUpdatesPage } from './tips-and-updates.page';

describe('TipsAndUpdatesPage', () => {
  let component: TipsAndUpdatesPage;
  let fixture: ComponentFixture<TipsAndUpdatesPage>;

  beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [TipsAndUpdatesPage]
	})
		.compileComponents();
  });

  beforeEach(() => {
	fixture = TestBed.createComponent(TipsAndUpdatesPage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
