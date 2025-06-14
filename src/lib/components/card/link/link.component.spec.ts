import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardLinkComponent} from './link.component';

describe('CardLinkComponent', () => {
  let component: CardLinkComponent;
  let fixture: ComponentFixture<CardLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLinkComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
