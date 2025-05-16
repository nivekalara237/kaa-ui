import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnInit,
  Optional,
  Self,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {ObjectUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {
  Color,
  HorizontalPosition,
  IconVariant,
  InputType,
  InputVariant,
  RoundedSize,
  Size,
  Status
} from '../../../model/types';
import {InputFactory} from './input.factory';
import {inputIconSize} from '../../../model/themes/input.theme';
import {NgControl} from '@angular/forms';
import {errorMessage} from './utils/errors-message-handler';
import {AbstractInputComponent} from '../shared/abstract-input.component';


@Component({
  selector: 'ui-input, ka-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css', "./variant.scss", "../common/style.component.scss"],
  providers: [
    /*{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }*/
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'transition-all duration-300'
  }
})
export class InputComponent extends AbstractInputComponent implements OnInit, AfterViewInit {
  label = input<string>();
  placeholder = input<string>();
  type = input.required<InputType>();
  rounding = input<RoundedSize>("small", {alias: 'roundedSize'});
  iconVariant = input<IconVariant>('pi');
  iconName = input<string>();
  iconPosition = input<HorizontalPosition>("left");
  variant = input<InputVariant>();
  size = input<Size>('small');
  color = input<Status | Color>('default');
  floating = input(false, {transform: booleanAttribute});
  gray = input(false, {transform: booleanAttribute});
  underline = input(false, {transform: booleanAttribute});
  required = input(false, {transform: booleanAttribute});
  readOnly = input(false, {transform: booleanAttribute});
  disabledInput = input(false, {transform: booleanAttribute, alias: "disabled"});

  ___inputClass!: string;
  ___labelClass!: string;
  ___inputFloatingClass!: string;
  ___labelFloatingClass!: string;
  ___commonVariantClass!: string;
  ___commonLabelVariantClass!: string;
  ___iconClass!: string;
  protected htmlContent = viewChild<HTMLDivElement>("htmlElement");
  protected inputNumberPinIconSize: Record<string, boolean> = {};
  // protected ngControl!: NgControl;
  protected readonly errorMessage = errorMessage;

  constructor(
    @Optional() @Self() protected ngControl: NgControl,
  ) {
    super(inject(ChangeDetectorRef), ngControl);
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get nativeElement() {
    return this.htmlContent()!;
  }

  get getVariant(): InputVariant {
    if (this.variant()) {
      return this.variant()!;
    } else if (this.underline()) {
      return 'underline';
    } else if (this.gray()) {
      return 'gray';
    } else {
      return 'basic';
    }
  }

  compiledClasses(): string {
    const builder = new StringBuilder();
    const iconBuilder = new StringBuilder(
      "absolute pointer-events-none peer-disabled:opacity-50 peer-disabled:pointer-events-none"
    );
    const commonBuilder = new StringBuilder("peer/input-number-pin-button");
    const inputBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder();
    const inputFloatingBuilder = new StringBuilder();
    const labelFloatingBuilder = new StringBuilder();

    const factory = new InputFactory({
      color: this.color(),
      floatingLabel: this.floating(),
      roundedSize: this.rounding(),
      hiddeLabel: ObjectUtils.isNullOrUndefined(this.label()),
      size: this.size(),
      required: this.required(),
      readonly: this.readOnly(),
      type: this.type(),
      hasIconAt: ObjectUtils.isNotNullAndNotUndefined(this.iconName()) ? this.iconPosition()! : null
    });

    const input = factory.of(this.getVariant);

    inputBuilder.append(input.getInputClassNames());
    labelBuilder.append(input.getLabelClassNames());

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }

    iconBuilder.append("dark:text-neutral-400")
      .append(inputIconSize[this.size()]);

    if (this.label() && !this.floating()) {
      iconBuilder.append("inset-y-1/2 ps-3")
    } else {
      iconBuilder.append("inset-y-0 flex items-center");
    }
    if (this.iconPosition() === "left") {
      iconBuilder.append("left-0 start-0 ps-3");
    } else {
      iconBuilder.append("right-0 end-0 pe-3");
    }

    if (this.type() === 'number') {
      inputBuilder.append("[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none");
    }

    if (this.labelClassName()) {
      labelBuilder.append(this.labelClassName()!);
    }

    if (this.inputClassName()) {
      inputBuilder.append(this.inputClassName()!);
    }

    this.___iconClass = twMerge(iconBuilder.segments());
    this.___labelClass = twMerge(labelBuilder.toString().split(" "));
    this.___inputClass = twMerge(inputBuilder.segments());
    this.___commonVariantClass = twMerge(commonBuilder.segments());
    this.___labelFloatingClass = twMerge(labelFloatingBuilder.toString().split(" "));
    this.___inputFloatingClass = twMerge(inputFloatingBuilder.toString().split(" "));

    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    // this.initSuper();
  }

  ngOnInit(): void {

    this.initSuper();
    this.elementClass = this.compiledClasses();
    this.___inputIdAttr = this.id();
    this.inputNumberPinIconSize = {
      'w-2.5 h-2.5': this.size() === 'tiny',
      'w-3.5 h-3.5': this.size() === 'small',
      'w-4 h-4': this.size() === 'medium',
      'w-4 h-5': this.size() === 'large',
      'w-5 h-5': this.size() === 'giant',
    };

    if (this.inputValue()) {
      this.nativeElement
    }
    // this.setDisabledState(this.disabledInput());
  }

  handlerInput($event: any) {
    if (!this.disabled) {
      const emitEvent = this.validation() ? ['change', 'any'].includes(this.validationMode()) : true;
      this.markAsTouched();
      this.updateValue($event.target.value, emitEvent);
      if (this.validation() && ['change', 'any'].includes(this.validationMode())) {
        this.errorable = true;
      }
    }
  }

  handlerEvent = ($event: any, eventType: 'BLUR' | 'FOCUS' | "KEY_UP") => {
    if (!this.disabled) {
      if (eventType === "BLUR") {
        this.markAsTouched();
        this.onBlur.emit($event);
        if (this.validation() && ['blur', "any"].includes(this.validationMode())) {
          this.notifyValueChange();
          this.errorable = true;
        }
        if (this.ngControl) {
          this.ngControl.control?.updateValueAndValidity();
        }
      } else {
        this.onFocus.emit($event);
      }
    }
  }
}
