import {
  AfterViewInit,
  booleanAttribute,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnInit,
  ViewChild
} from '@angular/core';
import {AbstractInputComponent} from '../shared/abstract-input.component';
import {RandomUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {CardinalDirection, Size, Status} from '../../../model/types';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ka-radio',
  standalone: false,

  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  inputId = input<string>();
  status = input<Status>('default');
  size = input<Size>('small');
  label = input<string>();
  labelPosition = input<CardinalDirection>("right");
  labelClassName = input<string>("");
  onlyLabel = input(false, {transform: booleanAttribute});
  disabledInput = input(false, {transform: booleanAttribute, alias: 'disabled'});
  checkedInput = input(false, {transform: booleanAttribute, alias: 'checked'});
  readOnly = input(false, {transform: booleanAttribute, alias: 'readOnly'});
  isItemGroup = false;
  el = inject(ElementRef<HTMLElement>);
  @ViewChild("inputElement")
  protected inputElement!: ElementRef<HTMLInputElement>;
  protected ___id!: string;
  protected ___radioClass!: string;
  protected ___labelClass!: string;
  protected ___onlyLabelClass!: string;

  compiledClasses(): string {
    const builder = new StringBuilder();
    const radioBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder("ka-radio-label");
    const onlyLabelBuilder = new StringBuilder();

    radioBuilder.append(`ka-radio ka-radio-${this.status()} ka-radio-size-${this.size()}`);

    if (this.disabledInput()) {
      radioBuilder.append("ka-radio-disabled");
      labelBuilder.append("cursor-not-allowed");
      onlyLabelBuilder.append("ka-radio-disabled");
    } else {
      labelBuilder.append("cursor-pointer");
    }

    if (this.onlyLabel()) {
      onlyLabelBuilder.append(`ka-radio-label-checkable ka-radio-label-checkable-${this.status()}`);
    }

    this.___radioClass = twMerge(radioBuilder.segments());

    builder.append(this.nativeClassName());
    labelBuilder.append(this.labelClassName());
    onlyLabelBuilder.append(this.labelClassName());

    this.___labelClass = twMerge(labelBuilder.segments());
    this.___onlyLabelClass = twMerge(onlyLabelBuilder.segments());
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.initAll();
  }

  handlerInputClick() {
    this.inputElement.nativeElement.click();
  }

  private initAll = () => {
    this.elementClass = this.compiledClasses();
    this.___id = this.inputId() ? this.inputId()! : RandomUtils.secureChars(12);
    this.updateValue(this.inputValue());
  }
}
