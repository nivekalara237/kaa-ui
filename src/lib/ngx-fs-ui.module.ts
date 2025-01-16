import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxFsUiService} from './ngx-fs-ui.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule],
  exports: []
})
export class NgxFsUiModule {
  static forRoot(config: string): ModuleWithProviders<NgxFsUiModule> {
    return {
      ngModule: NgxFsUiModule,
      providers: [
        NgxFsUiService
      ]
    }
  }
}
