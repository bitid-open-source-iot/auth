import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFileComponent } from './mat-file.component';

describe('MatFileComponent', () => {
  let component: MatFileComponent;
  let fixture: ComponentFixture<MatFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatFileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
