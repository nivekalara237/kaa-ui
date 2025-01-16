import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphColumnComponent } from './paragraph-column.component';

describe('ParagraphColumnComponent', () => {
  let component: ParagraphColumnComponent;
  let fixture: ComponentFixture<ParagraphColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParagraphColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
