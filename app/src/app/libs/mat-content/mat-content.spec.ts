import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatContent } from './mat-content';

describe('MatContent', () => {
  let component: MatContent;
  let fixture: ComponentFixture<MatContent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatContent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
