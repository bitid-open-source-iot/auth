import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAvatarComponent } from './mat-avatar.component';

describe('MatAvatarComponent', () => {
  let component: MatAvatarComponent;
  let fixture: ComponentFixture<MatAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
