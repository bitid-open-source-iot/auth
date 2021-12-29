import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsFilterDialog } from './filter.dialog';

describe('GroupsFilterDialog', () => {
  let component: GroupsFilterDialog;
  let fixture: ComponentFixture<GroupsFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsFilterDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
