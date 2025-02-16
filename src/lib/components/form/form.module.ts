import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {TextareaComponent} from './textarea/textarea.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {CheckboxGroupComponent} from './checkbox-group/checkbox-group.component';
import {CheckboxLabelComponent} from './checkbox/label/label.component';
import {CheckboxCustomIconComponent} from './checkbox/custom-icon/checkbox-custom-icon.component';
import {RadioButtonComponent} from './radio-button/radio-button.component';
import {RadioLabelComponent} from './radio-button/label/label.component';
import {RadioGroupComponent} from './radio-button/group/group.component';

@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxLabelComponent,
    CheckboxCustomIconComponent,
    RadioButtonComponent,
    RadioLabelComponent,
    RadioGroupComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxLabelComponent,
    CheckboxCustomIconComponent,
    RadioLabelComponent,
    RadioButtonComponent,
    RadioGroupComponent
  ],
  providers: []
})
export class FormUiModule {
}
