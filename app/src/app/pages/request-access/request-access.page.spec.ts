import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccessPage } from './request-access.page';

describe('RequestAccessPage', () => {
  let component: RequestAccessPage;
  let fixture: ComponentFixture<RequestAccessPage>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ RequestAccessPage ]
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(RequestAccessPage);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
