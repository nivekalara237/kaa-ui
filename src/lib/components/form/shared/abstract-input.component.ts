import {FormElementControlValueAccessor} from './form-element.control-value-accessor';
import {booleanAttribute, ChangeDetectorRef, Directive, input, model, output, TemplateRef} from '@angular/core';
import {InputValidationMode} from '../../../model/types';
import {RandomUtils} from 'co2m.js';
import {NgControl} from '@angular/forms';

@Directive(
  {
    providers: [],
    host: {
      "ngSkipHydration": '',
      'class': 'prose'
    }
  }
)
export abstract class AbstractInputComponent extends FormElementControlValueAccessor {
  name = model<string>();
  inputValue = input<any>();
  ariaLabelledBy = input<string>();
  ariaLabel = input<string>();
  fieldId = input<string>();
  helperText = input<string | TemplateRef<any>>();
  validation = input(false, {transform: booleanAttribute});
  validationMode = input<InputValidationMode>("blur");
  labelClassName = input<string>();
  inputClassName = input<string>();

  onBlur = output<any | void>();
  onFocus = output<any | void>();
  change = output<any>();
  touch = output<any>();

  protected ___inputIdAttr!: string | undefined;

  // protected abstract ngControl: NgControl;

  protected constructor(
    cd: ChangeDetectorRef,
    private _ngControl: NgControl
  ) {
    super(cd);
    if (_ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  get getDescribedBy(): string | null {
    const ids = [];
    if (this.helperText()) ids.push(this.helperId);
    if (this.hasError && this.errorable) ids.push(this.errorId);
    return ids.length ? ids.join(' ') : null;
  }

  get isHelperText() {
    return typeof this.helperText() === "string" || !(this.helperText() instanceof TemplateRef)
  }

  get helperTextAsTemplate() {
    return this.helperText() as TemplateRef<any>;
  }

  protected get errorId(): string {
    return this.___inputIdAttr + '-error';
  }

  protected get isError() {
    return this.errorable && this.hasError;
  };

  id = () => this.fieldId() ? this.fieldId() : RandomUtils.secureChars(12);

  helperId = () => this.___inputIdAttr + "-help";

  protected initSuper = () => {
    this.___inputIdAttr = this.id();
    setTimeout(() => {
      if (this._ngControl) {
        // console.log(this.ngControl.control);
        this._ngControl.valueChanges?.subscribe(value => {
          this.hasError = !!this._ngControl.errors;
          this.controlErrors = this._ngControl.errors;
          this.handlerError();
        });
      }
    }, 0);
  };

  protected handleChange(value: any, eventType: 'FOCUS' | 'INPUT' | 'BLUR' | 'KEY_UP') {
    if (this.disabled) return;
    if (eventType === "INPUT") {
      this.change.emit(value);
      const emitEvent = this.validation() ? ['change', 'any'].includes(this.validationMode()) : true;
      this.markAsTouched();
      this.updateValue(value, emitEvent);
      if (this.validation() && ['change', 'any'].includes(this.validationMode())) {
        this.errorable = true;
      }
    } else if (eventType === "BLUR") {
      this.touch.emit(value);
      this.markAsTouched();
      this.onBlur.emit(value);
      if (this.validation() && ['blur', "any"].includes(this.validationMode())) {
        this.notifyValueChange();
        this.errorable = true;
      }
      if (this._ngControl?.control) {
        this._ngControl.control.updateValueAndValidity();
      }
    } else if (eventType === "FOCUS") {
      this.onFocus.emit(value);
    } else if (eventType === "KEY_UP") {
      // to handle at late.
    }
  }


  private handlerError = () => {
    this._ngControl.control?.statusChanges?.subscribe(value => {
      if (this._ngControl.control?.touched && !this.touched) {
        this.markAsTouched();
        this.changeDetector.markForCheck();
      }
      if (this._ngControl.control?.dirty) {
        this.errorable = true;
        this.changeDetector.markForCheck();
      }
    });
  };
}
