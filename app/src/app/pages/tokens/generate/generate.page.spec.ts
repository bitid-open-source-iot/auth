import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTokenPage } from './generate.page';

describe('GenerateTokenPage', () => {
  let component: GenerateTokenPage;
  let fixture: ComponentFixture<GenerateTokenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateTokenPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
