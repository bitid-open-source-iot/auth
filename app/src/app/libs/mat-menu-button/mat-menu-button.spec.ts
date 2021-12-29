import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatMenuButton } from './mat-menu-button';

describe('MatMenuButton', () => {
  let component: MatMenuButton;
  let fixture: ComponentFixture<MatMenuButton>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MatMenuButton]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatMenuButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
