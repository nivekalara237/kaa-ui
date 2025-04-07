import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  OnInit,
  viewChild
} from '@angular/core';
import {ObjectUtils, RandomUtils, StringBuilder} from 'co2m.js';
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
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractInputComponent} from '../shared/abstract-input.component';

@Component({
  selector: 'ui-input, ka-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'transition-all duration-300'
  }
})
export class InputComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  label = input<string>();
  // labelDisposition = input<Position>('top');
  placeholder = input<string>();
  inputId = input<string>();
  inputType = input.required<InputType>();
  rounding = input<RoundedSize>("small", {alias: 'roundedSize'});
  inputAddonIcon = input<IconVariant>('pi');
  addonIcon = input<string>();
  addonIconPosition = input<HorizontalPosition>("left");
  variant = input<InputVariant>();
  size = input<Size>('small');
  color = input<Status | Color>('default');
  floatingLabel = input(false, {transform: booleanAttribute});
  gray = input(false, {transform: booleanAttribute});
  underline = input(false, {transform: booleanAttribute});
  requiredValue = input(false, {transform: booleanAttribute});
  readOnly = input(false, {transform: booleanAttribute});
  ___inputClass!: string;
  ___labelClass!: string;
  ___inputFloatingClass!: string;
  ___labelFloatingClass!: string;
  ___commonVariantClass!: string;
  ___commonLabelVariantClass!: string;
  ___iconClass!: string;
  ___inputIdAttr!: string | undefined;
  protected htmlContent = viewChild<HTMLDivElement>("htmlElement");
  protected inputNumberPinIconSize: Record<string, boolean> = {
    'w-2.5 h-2.5': this.size() === 'tiny',
    'w-3.5 h-3.5': this.size() === 'small',
    'w-4 h-4': this.size() === 'medium',
    'w-5 h-5': this.size() === 'large',
    'w-6 h-6': this.size() === 'giant',
  };

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

  id = () => this.inputId() ? this.inputId() : RandomUtils.secureChars(12)

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
      floatingLabel: this.floatingLabel(),
      roundedSize: this.rounding(),
      hiddeLabel: ObjectUtils.isNullOrUndefined(this.label()),
      size: this.size(),
      required: this.requiredValue(),
      readonly: this.readOnly(),
      type: this.inputType(),
      hasIconAt: ObjectUtils.isNotNullAndNotUndefined(this.addonIcon()) ? this.addonIconPosition()! : null
    });

    const input = factory.of(this.getVariant);

    inputBuilder.append(input.getInputClassNames());
    labelBuilder.append(input.getLabelClassNames());

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }

    iconBuilder.append("dark:text-neutral-400")
      .append(inputIconSize[this.size()]);

    if (this.label() && !this.floatingLabel()) {
      iconBuilder.append("inset-y-1/2 ps-3")
    } else {
      iconBuilder.append("inset-y-0 flex items-center");
    }
    if (this.addonIconPosition() === "left") {
      iconBuilder.append("left-0 start-0 ps-3");
    } else {
      iconBuilder.append("right-0 end-0 pe-3");
    }

    if (this.inputType() === 'number') {
      inputBuilder.append("[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none");
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
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    this.___inputIdAttr = this.id();

    if (this.inputValue()) {
      this.nativeElement
    }
  }

  handlerInput($event: any) {
    this.setValue($event.target.value, true);
  }

  handlerEvent = ($event: any, eventType: 'BLUR' | 'FOCUS') => {
    if (eventType === "BLUR") {
      this.onBlur.emit($event);
    } else {
      this.onFocus.emit($event);
    }
  }
}
