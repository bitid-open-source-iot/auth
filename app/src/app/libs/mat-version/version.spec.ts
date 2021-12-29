import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatVersion } from './mat-version';

describe('MatVersion', () => {
  let component: MatVersion;
  let fixture: ComponentFixture<MatVersion>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MatVersion]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatVersion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
