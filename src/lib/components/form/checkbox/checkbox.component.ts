import {AfterViewInit, booleanAttribute, Component, ContentChildren, input, OnInit, QueryList} from '@angular/core';
import {FormElementControlValueAccessor} from '../shared/form-element.control-value-accessor';
import {RandomUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {HorizontalPosition, IconVariant, RoundedSize, Size, Status} from '../../../model/types';
import {CheckBoxState, Off, On, Partial} from './intermediate-state';
import {inputRoundedSizeMapping} from '../../../model/themes/input.theme';
import {checkboxBorderMapping, checkboxIconSizeMapping, checkboxSizeMapping} from '../../../model/shapes/input.shape';
import {CheckboxCustomIconComponent} from './custom-icon/checkbox-custom-icon.component';

@Component({
  selector: 'ka-checkbox',
  standalone: false,

  templateUrl: './checkbox.component.html',
  styleUrls: [
    './checkbox.component.css',
    './checkable-label.css'
  ]
})
export class CheckboxComponent extends FormElementControlValueAccessor implements OnInit, AfterViewInit {

  @ContentChildren(CheckboxCustomIconComponent)
  customCheckboxes!: QueryList<CheckboxCustomIconComponent>;

  solid = input(true, {transform: booleanAttribute});
  outline = input(false, {transform: booleanAttribute});
  ripple = input(false, {transform: booleanAttribute});
  rounded = input<RoundedSize>('small');
  status = input<Status>('primary');
  size = input<Size>('small');
  icon = input<IconVariant>();
  disabledCheckbox = input(false, {transform: booleanAttribute, alias: 'disabled'});
  readOnly = input(false, {transform: booleanAttribute});
  onlyLabel = input(false, {transform: booleanAttribute});
  intermediate = input(false, {transform: booleanAttribute});
  checkboxClassName = input<string>();
  labelClassName = input<string>();
  required = input(false, {transform: booleanAttribute});
  checked = input(false, {transform: booleanAttribute});
  inputId = input<string>();
  label = input<string>();
  labelPosition = input<HorizontalPosition>('right');

  __id!: string;
  __checkboxClass!: string;
  __labelClass!: string;
  __iconClass!: string;
  ___state!: CheckBoxState;
  hasCustomIcon: boolean = false;
  protected readonly Intermediate = Partial;

  compiledClasses(): string {
    const builder = new StringBuilder();
    const iconBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder("text-sm font-normal cursor-pointer text-gray-600");
    const checkboxBuilder = new StringBuilder("appearance-none cursor-pointer")
      .append("checked:bg-no-repeat checked:bg-center")
      .append("focus:ring-0 outline-none focus:outline-none")
      .append("transition-all ease-in-out duration-300")
      .append("focus-visible:outline-none focus-visible:outline-offset-2")
      .append("forced-colors:appearance-auto");

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }

    checkboxBuilder.append(`form-checkbox-${this.status()}-theme-styles`)
      .append("form-checkbox-shape-styles")
      .append(inputRoundedSizeMapping[this.rounded()])
      .append(checkboxSizeMapping[this.size()])
      .append(checkboxBorderMapping[this.size()]);

    if (this.onlyLabel()) {
      checkboxBuilder.append("hidden peer");
      iconBuilder.append("hidden");
      labelBuilder.append(`form-checkable-label form-checkable-${this.status()} form-checkable-label-hover peer-checked-${this.status()}`)
        .append(`peer-checked-rounded-${this.rounded()}`)
    }
    iconBuilder.append("form-checkbox-icon")
      .append(checkboxIconSizeMapping[this.size()]);

    if (this.labelClassName()) {
      labelBuilder.append(this.labelClassName()!);
    }

    if (this.checkboxClassName()) {
      checkboxBuilder.append(this.checkboxClassName()!);
    }

    this.__checkboxClass = twMerge(checkboxBuilder.segments());
    this.__labelClass = twMerge(labelBuilder.segments());
    this.__iconClass = twMerge(iconBuilder.segments());
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    console.log(this.customCheckboxes.toArray());
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    this.__id = this.inputId() ? this.inputId()! : RandomUtils.secureChars(12);
    this.___state = this.intermediate() ? Partial : (this.checked() ? On : Off);
  }

  handlerCheckboxChange(checked: boolean) {
    if (this.intermediate()) {
      console.log({
        previousState: this.___state.value,
        currentState: this.___state.next().value,
        nextState: this.___state.next().next().value
      });

      const _checked = this.___state.next() === Partial ? null : (this.___state.next() === On);
      this.onChange(_checked);
      this.setValue(_checked);
    } else {
      this.onChange(checked);
      this.setValue(checked);
    }
    this.___state = this.___state.next();
  }
}
