import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupOptionComponent} from './group-option.component';

describe('GroupComponent', () => {
  let component: GroupOptionComponent;
  let fixture: ComponentFixture<GroupOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupOptionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
