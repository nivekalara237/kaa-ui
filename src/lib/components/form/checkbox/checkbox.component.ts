import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Host,
  inject,
  input,
  OnInit,
  Optional,
  QueryList
} from '@angular/core';
import {ObjectUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {IconVariant, Position, RoundedSize, Size, Status} from '../../../model/types';
import {CheckBoxState, Off, On, Partial} from './intermediate-state';
import {inputRoundedSizeMapping} from '../../../model/themes/input.theme';
import {checkboxBorderMapping, checkboxIconSizeMapping, checkboxSizeMapping} from '../../../model/shapes/input.shape';
import {CheckboxCustomIconComponent} from './custom-icon/checkbox-custom-icon.component';
import {AbstractInputComponent} from '../shared/abstract-input.component';
import {NgControl} from '@angular/forms';
import {errorMessage} from '../input/utils/errors-message-handler';

@Component({
  selector: 'ka-checkbox',
  standalone: false,

  templateUrl: './checkbox.component.html',
  styleUrls: [
    './checkbox.component.css',
    './checkable-label.css',
    '../common/style.component.scss'
  ],
  providers: []
})
export class CheckboxComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  @ContentChildren(CheckboxCustomIconComponent, {descendants: false})
  customCheckboxes!: QueryList<CheckboxCustomIconComponent>;

  //// solid = input(true, {transform: booleanAttribute});
  outline = input(false, {transform: booleanAttribute});
  ripple = input(false, {transform: booleanAttribute});
  roundedSize = input<RoundedSize>('small');
  status = input<Status>('primary');
  size = input<Size>('small');
  icon = input<IconVariant>();
  disabledCheckbox = input(false, {transform: booleanAttribute, alias: 'disabled'});
  readOnly = input(false, {transform: booleanAttribute});
  onlyLabel = input(false, {transform: booleanAttribute});
  intermediate = input(false, {transform: booleanAttribute});
  required = input(false, {transform: booleanAttribute});
  checked = input(false, {transform: booleanAttribute});
  label = input<string>();
  labelPosition = input<Position>('right');

  __checkboxClass!: string;
  __labelClass!: string;
  __iconClass!: string;
  ___state!: CheckBoxState;
  hasCustomIcon: boolean = false;
  protected readonly Intermediate = Partial;

  // private ngControl!: NgControl
  protected readonly errorMessage = errorMessage;

  constructor(
    @Optional() @Host() public ngControl: NgControl
  ) {
    super(inject(ChangeDetectorRef), ngControl);
  }

  compiledClasses(): string {
    const builder = new StringBuilder();
    const iconBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder("text-inherit font-normal cursor-pointer text-gray-600");
    const checkboxBuilder = new StringBuilder("appearance-none shadow hover:shadow-md cursor-pointer")
      .append("checked:bg-no-repeat checked:bg-center")
      .append("focus:ring-0 outline-none focus:outline-none")
      .append("transition-all ease-in-out duration-300")
      .append("focus-visible:outline-none focus-visible:outline-offset-2")
      .append("forced-colors:appearance-auto");

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }

    checkboxBuilder
      .append("form-checkbox-shape-styles")
      .append(inputRoundedSizeMapping[this.roundedSize()])
      .append(checkboxSizeMapping[this.size()])
      .append(checkboxBorderMapping[this.size()]);

    if (this.outline()) {
      checkboxBuilder.append(`checkbox-outline-${this.status()}`);
      iconBuilder.append(`checkbox-outline-${this.status()}-icon`);
    } else {
      checkboxBuilder.append(`form-checkbox-${this.status()}-theme-styles`);
      iconBuilder.append("form-checkbox-icon");
    }

    if (this.onlyLabel()) {
      checkboxBuilder.append("hidden peer");
      iconBuilder.append("hidden");
      labelBuilder.append(`form-checkable-label form-checkable-${this.status()} form-checkable-label-hover peer-checked-${this.status()}`)
        .append(`peer-checked-rounded-${this.roundedSize()}`)
    }
    iconBuilder.append(checkboxIconSizeMapping[this.size()]);

    if (this.labelClassName()) {
      labelBuilder.append(this.labelClassName()!);
    }

    if (this.inputClassName()) {
      checkboxBuilder.append(this.inputClassName()!);
    }

    this.__checkboxClass = twMerge(checkboxBuilder.segments());
    this.__labelClass = twMerge(labelBuilder.segments());
    this.__iconClass = twMerge(iconBuilder.segments());
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    const icons = this.customCheckboxes.toArray();
    if (icons.length > 0) {
      this.hasCustomIcon = true;
      this.changeDetector.detectChanges();
    }
  }

  ngOnInit(): void {
    this.initSuper();
    this.init();
    this.elementClass = this.compiledClasses();
  }

  init = () => {
    this.___state = this.intermediate() ? Partial : (this.checked() ? On : Off);
    if (ObjectUtils.isNotNullAndNotUndefined(this.checked())) {
      this.updateValue(this.checked());
    }
  };

  handlerCheckboxChange(checked: boolean) {
    if (this.intermediate()) {
      const _checked = this.___state.next() === Partial ? null : (this.___state.next() === On);
      this.updateValue(_checked, true);
    } else {
      this.updateValue(checked, true);
    }
    this.___state = this.___state.next();
  }
}
