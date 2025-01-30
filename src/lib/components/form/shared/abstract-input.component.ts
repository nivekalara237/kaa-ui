import {FormElementControlValueAccessor} from './form-element.control-value-accessor';
import {Component, input, model, output} from '@angular/core';

@Component({template: ''})
export abstract class AbstractInputComponent extends FormElementControlValueAccessor {
  name = model<string>();
  inputValue = input<any>();
  ariaLabelledBy = input<string>();
  ariaLabel = input<string>();

  onBlur = output<void>();
  onFocus = output<void>();
}
