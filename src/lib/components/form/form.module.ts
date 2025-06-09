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
import {SelectComponent} from './select/select.component';
import {DropdownModule} from "../dropdown/dropdown.module";
import {OptionComponent} from "./select/option/option.component";
import {FormsModule} from '@angular/forms';
import {IconComponent} from '../icon/icon.component';
import {GroupOptionComponent} from './select/group/group-option.component';
import {SlotActionDirective} from './select/slot/slot-action.directive';
import {SlotHeaderDirective} from './select/slot/slot-header.directive';
import {SlotEmptyDirective} from './select/slot/slot-empty.directive';
import {TextareaAndInputCharCountDirective} from './shared/textarea-and-input-char-count.directive';
import {CheckboxControlComponent} from './checkbox/checkbox-control/checkbox-control.component';
import {RadioControlComponent} from './radio-button/radio-control/radio-control.component';
import {FileInputComponent} from './file-input/file-input.component';

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
    RadioGroupComponent,
    SelectComponent,
    OptionComponent,
    GroupOptionComponent,
    CheckboxControlComponent,
    RadioControlComponent,
    SlotHeaderDirective,
    SlotActionDirective,
    SlotEmptyDirective,
    TextareaAndInputCharCountDirective,
    FileInputComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    IconComponent
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
    RadioGroupComponent,
    SelectComponent,
    OptionComponent,
    GroupOptionComponent,
    CheckboxControlComponent,
    RadioControlComponent,
    SlotHeaderDirective,
    SlotActionDirective,
    SlotEmptyDirective,
    TextareaAndInputCharCountDirective,
    FileInputComponent
  ],
  providers: []
})
export class FormUiModule {
}
