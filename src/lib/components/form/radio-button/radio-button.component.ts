import {AfterViewInit, booleanAttribute, Component, forwardRef, input, OnInit} from '@angular/core';
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
  ___id!: string;
  ___radioClass!: string;
  ___labelClass!: string;

  compiledClasses(): string {
    const builder = new StringBuilder();
    const radioBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder("ka-radio-label");

    radioBuilder.append(`ka-radio ka-radio-${this.status()} ka-radio-size-${this.size()}`);

    if (this.disabledInput()) {
      radioBuilder.append("ka-radio-disabled");
      labelBuilder.append("cursor-not-allowed");
    } else {
      labelBuilder.append("cursor-pointer");
    }

    this.___radioClass = twMerge(radioBuilder.segments());

    builder.append(this.nativeClassName());
    labelBuilder.append(this.labelClassName());

    this.___labelClass = twMerge(labelBuilder.segments());
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.initAll();
  }

  private initAll = () => {
    this.elementClass = this.compiledClasses();
    this.___id = this.inputId() ? this.inputId()! : RandomUtils.secureChars(12);
    this.setValue(this.inputValue());
  }

}
