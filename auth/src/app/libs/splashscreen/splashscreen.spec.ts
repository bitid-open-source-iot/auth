import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashScreen } from './splashscreen';

describe('SplashScreen', () => {
  let component: SplashScreen;
  let fixture: ComponentFixture<SplashScreen>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ SplashScreen ]
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(SplashScreen);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
