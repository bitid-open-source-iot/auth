import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSheet } from './options.component';

describe('OptionsSheet', () => {
  let component: OptionsSheet;
  let fixture: ComponentFixture<OptionsSheet>;

  beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [ OptionsSheet ]
	})
	.compileComponents();
  });

  beforeEach(() => {
	fixture = TestBed.createComponent(OptionsSheet);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
