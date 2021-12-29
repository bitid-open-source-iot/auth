import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsEditorPage } from './editor.page';

describe('GroupsEditorPage', () => {
  let component: GroupsEditorPage;
  let fixture: ComponentFixture<GroupsEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
