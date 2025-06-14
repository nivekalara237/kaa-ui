import {ControlValueAccessor, ValidationErrors} from '@angular/forms';
import {AbstractUIComponent} from '../../abstract.component';

export abstract class FormElementControlValueAccessor<T = any> extends AbstractUIComponent implements ControlValueAccessor {
  hasError = false;
  controlErrors: ValidationErrors | null = null;
  protected value!: T;
  protected touched = false;
  protected disabled = false;
  protected errorable = false;


  onChange = (value: T) => {
  };

  onTouched = () => {
  };

  onValidatorChange = () => {
  };

  updateValue(__value: T, emitEvent: boolean = true) {
    this.value = __value;
    this.onChange(__value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.updateValue(obj, true);
    setTimeout(() => this.changeDetector.markForCheck(), 0);
  }

  markAsTouched = () => {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  };

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetector.markForCheck();
  }

  notifyValueChange(): void {
    if (!this.disabled) {
      /*if (this.onChange) {
        this.onChange(this.value);
      }*/
    }
  }

  protected handlerChange = () => {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChange(this.value);
    }
  };

}
