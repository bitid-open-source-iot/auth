import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsEditorpage } from './editor.page';

describe('GroupsEditorpage', () => {
  let component: GroupsEditorpage;
  let fixture: ComponentFixture<GroupsEditorpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsEditorpage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsEditorpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
