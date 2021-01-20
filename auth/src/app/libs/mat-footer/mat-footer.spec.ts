import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFooter } from './mat-footer';

describe('MatFooter', () => {
  let component: MatFooter;
  let fixture: ComponentFixture<MatFooter>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ MatFooter ]
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(MatFooter);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
