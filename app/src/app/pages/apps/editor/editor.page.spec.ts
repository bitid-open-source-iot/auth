import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEditorpage } from './editor.page';

describe('AppsEditorpage', () => {
  let component: AppsEditorpage;
  let fixture: ComponentFixture<AppsEditorpage>;

  beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [ AppsEditorpage ]
	})
	.compileComponents();
  });

  beforeEach(() => {
	fixture = TestBed.createComponent(AppsEditorpage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
