import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTokenPage } from './view.page';

describe('ViewTokenPage', () => {
  let component: ViewTokenPage;
  let fixture: ComponentFixture<ViewTokenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTokenPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
