import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDialog } from './update.dialog';

describe('UpdateDialog', () => {
  let component: UpdateDialog;
  let fixture: ComponentFixture<UpdateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
