import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {TextareaComponent} from './textarea/textarea.component';

@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent,
    TextareaComponent
  ]
})
export class FormUiModule {
}
