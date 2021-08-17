import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesEditorPage } from './editor.page';

describe('FeaturesEditorPage', () => {
  let component: FeaturesEditorPage;
  let fixture: ComponentFixture<FeaturesEditorPage>;

  beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [ FeaturesEditorPage ]
	})
	.compileComponents();
  });

  beforeEach(() => {
	fixture = TestBed.createComponent(FeaturesEditorPage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
