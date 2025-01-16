import { TestBed } from '@angular/core/testing';

import { NgxFsUiService } from './ngx-fs-ui.service';

describe('NgxFsUiService', () => {
  let service: NgxFsUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFsUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
