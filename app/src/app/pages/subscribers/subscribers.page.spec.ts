import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersPage } from './subscribers.page';

describe('SubscribersPage', () => {
  let component: SubscribersPage;
  let fixture: ComponentFixture<SubscribersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscribersPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
