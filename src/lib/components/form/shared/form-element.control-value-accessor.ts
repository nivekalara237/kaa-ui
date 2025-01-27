import {AbstractControl, ControlValueAccessor, ValidationErrors, Validator} from '@angular/forms';
import {AbstractUIComponent} from '../../abstract.component';

export abstract class FormElementControlValueAccessor extends AbstractUIComponent implements ControlValueAccessor, Validator {
  protected value!: any;
  protected touched = false;
  protected disabled = false;
  // protected validateState = input<FormInputValidateState>();

  onChange = (value: any) => {
  };

  onTouched = () => {
  };

  setValue(__value: any, emitEvent?: boolean) {
    this.value = __value;
    if (emitEvent && this.onChange) {
      this.onChange(__value);
      this.onTouched?.();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.setValue(obj, true);
    this.changeDetector.markForCheck();
  }

  markAsTouched = () => {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  };

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  protected handlerChange = () => {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChange(this.value);
    }
  };

}
