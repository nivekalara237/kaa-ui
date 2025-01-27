import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckboxCustomIconComponent} from './checkbox-custom-icon.component';

describe('CustomIconComponent', () => {
  let component: CheckboxCustomIconComponent;
  let fixture: ComponentFixture<CheckboxCustomIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxCustomIconComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckboxCustomIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
