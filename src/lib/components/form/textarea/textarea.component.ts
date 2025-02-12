import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  input,
  OnInit,
  output,
  ViewChild
} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {ObjectUtils, RandomUtils, StringBuilder, StringUtils} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {InputFactory} from '../input/input.factory';
import {Color, InputVariant, OverflowPosition, RoundedSize, Size, Status, TextareaResize} from '../../../model/types';
import {FormElementControlValueAccessor} from '../shared/form-element.control-value-accessor';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {genericWithDefaultAttribute, stringAttribute} from '../input/utils/functions';
import {textareaResize, textareaScrollablePosition} from '../../../model/themes/input.theme';
import {scrollbarStylesMapping} from '../../../model/themes/common.theme';

@Component({
  selector: 'ui-textarea',
  standalone: false,
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractUIComponent,
      useExisting: TextareaComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent extends FormElementControlValueAccessor implements OnInit, AfterViewInit {

  @ViewChild("content")
  contentElement!: ElementRef<HTMLDivElement>;

  resizable = input(undefined, {transform: (v: TextareaResize) => ObjectUtils.isNullOrUndefined(v) ? 'xy' : v});
  scrollable = input(undefined, {transform: (v: OverflowPosition) => ObjectUtils.isNullOrUndefined(v) || StringUtils.size(v + "") === 0 ? 'auto' : v});
  roundedSize = input<RoundedSize>("small", {alias: 'rounding'});
  size = input<Size>("medium");
  color = input<Status | Color>("default");
  variant = input<InputVariant>("basic");
  placeholder = input(null, {transform: stringAttribute});
  label = input<string>();
  textareaInputId = input<string>();
  textareaClass = input<string>();
  rows = input(null, {transform: genericWithDefaultAttribute<number>(4)});
  gray = input(false, {transform: booleanAttribute});
  underline = input(false, {transform: booleanAttribute});
  requiredValue = input(false, {transform: booleanAttribute});
  readOnly = input(false, {transform: booleanAttribute});

  change = output<string>();
  touch = output<string>();

  ___textareaClasses!: string;
  ___labelClasses!: string;
  ___id!: string;

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
    const areaclassesBuilder = new StringBuilder();
    const labelclassesBuilder = new StringBuilder();

    const factory = new InputFactory({
      color: this.color(),
      hasIconAt: null,
      roundedSize: this.roundedSize(),
      size: this.size(),
      type: "text",
      required: this.requiredValue(),
      readonly: this.readOnly()
    });

    const inputVariant = factory.of(this.getVariant);

    areaclassesBuilder.append(scrollbarStylesMapping['default'])
      .append("[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full")
    if (this.resizable()) {
      areaclassesBuilder.append(textareaResize[this.resizable()!])
    }
    if (this.scrollable()) {
      areaclassesBuilder.append(textareaScrollablePosition[this.scrollable()!])
    }

    areaclassesBuilder.append(inputVariant.getInputClassNames())
      // disabled
      .append("disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50")
      // outline
      .append(" outline-none transition-all duration-200")
    ;

    labelclassesBuilder.append(inputVariant.getLabelClassNames());

    if (this.getVariant === 'underline') {
      areaclassesBuilder.append("px-1");
    }

    if (this.textareaClass()) {
      areaclassesBuilder.append(this.textareaClass()!);
    }


    this.___textareaClasses = twMerge(areaclassesBuilder.segments());
    this.___labelClasses = twMerge(labelclassesBuilder.segments());

    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    if (this.contentElement) {
      const text = this.contentElement.nativeElement.textContent;
      if (StringUtils.size(text!) !== 0) {
        this.setValue(text, false);
        this.changeDetector.markForCheck();
      }
    }
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    this.___id = ObjectUtils.isNullOrUndefined(this.textareaInputId()) ? RandomUtils.secureChars(12) : this.textareaInputId()!;
  }

  handleChange($event: string) {
    this.change.emit($event);
    // this.handlerChange();
    this.setValue($event, true);
  }
}
