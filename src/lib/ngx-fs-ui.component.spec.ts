import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFsUiComponent } from './ngx-fs-ui.component';

describe('NgxFsUiComponent', () => {
  let component: NgxFsUiComponent;
  let fixture: ComponentFixture<NgxFsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFsUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxFsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
