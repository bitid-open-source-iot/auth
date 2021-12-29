import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatBackButton } from './mat-back-button';

describe('MatBackButton', () => {
  let component: MatBackButton;
  let fixture: ComponentFixture<MatBackButton>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MatBackButton]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatBackButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
