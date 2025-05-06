import {FormElementControlValueAccessor} from './form-element.control-value-accessor';
import {Directive, input, model, output} from '@angular/core';

@Directive(
  {
    providers: []
  }
)
export abstract class AbstractInputComponent extends FormElementControlValueAccessor {
  name = model<string>();
  inputValue = input<any>();
  ariaLabelledBy = input<string>();
  ariaLabel = input<string>();

  onBlur = output<void>();
  onFocus = output<void>();
}
