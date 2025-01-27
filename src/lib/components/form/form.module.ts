import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {TextareaComponent} from './textarea/textarea.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {CheckboxGroupComponent} from './checkbox-group/checkbox-group.component';
import {CheckboxLabelComponent} from './checkbox/label/label.component';
import {CheckboxCustomIconComponent} from './checkbox/custom-icon/checkbox-custom-icon.component';

@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxLabelComponent,
    CheckboxCustomIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxLabelComponent,

  ]
})
export class FormUiModule {
}
