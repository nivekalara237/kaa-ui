import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule],
  exports: []
})
export class NgxFsUiModule {
  static forRoot(config: {
    disabledAnimationModule: boolean
  }): ModuleWithProviders<NgxFsUiModule> {
    const imports = [
      BrowserAnimationsModule
    ];
    return {
      ngModule: NgxFsUiModule,
      providers: [],
      // imports: imports
    }
  }
}
