import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardSubTitleComponent} from './sub-title.component';

describe('CardSubTitleComponent', () => {
  let component: CardSubTitleComponent;
  let fixture: ComponentFixture<CardSubTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSubTitleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardSubTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
