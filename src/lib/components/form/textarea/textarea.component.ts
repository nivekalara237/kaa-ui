import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import {ObjectUtils, StringBuilder, StringUtils} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {InputFactory} from '../input/input.factory';
import {Color, InputVariant, OverflowPosition, RoundedSize, Size, Status, TextareaResize} from '../../../model/types';
import {NgControl} from '@angular/forms';
import {genericWithDefaultAttribute, stringAttribute} from '../input/utils/functions';
import {textareaResize, textareaScrollablePosition} from '../../../model/themes/input.theme';
import {scrollbarStylesMapping} from '../../../model/themes/common.theme';
import {errorMessage} from '../input/utils/errors-message-handler';
import {AbstractInputComponent} from '../shared/abstract-input.component';

@Component({
  selector: 'ui-textarea',
  standalone: false,
  templateUrl: './textarea.component.html',
  styleUrls: [
    './textarea.component.css',
    'textarea.component.scss',
    '../common/style.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  host: {
    'class': 'transition-all duration-300'
  }
})
export class TextareaComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  @ViewChild("content")
  contentElement!: ElementRef<HTMLDivElement>;
  @ViewChild('textarea') textareaElement!: ElementRef<HTMLTextAreaElement>;

  resizable = input(undefined, {transform: (v: TextareaResize) => ObjectUtils.isNullOrUndefined(v) ? 'xy' : v});
  scrollable = input(undefined, {transform: (v: OverflowPosition) => ObjectUtils.isNullOrUndefined(v) || StringUtils.size(v + "") === 0 ? 'auto' : v});
  roundedSize = input<RoundedSize>("small", {alias: 'rounding'});
  size = input<Size>("small");
  color = input<Status | Color>("default");
  variant = input<InputVariant>("basic");
  placeholder = input(null, {transform: stringAttribute});
  label = input<string>();
  textareaInputId = input<string>();
  rows = input(null, {transform: genericWithDefaultAttribute<number>(4)});
  gray = input(false, {transform: booleanAttribute});
  underline = input(false, {transform: booleanAttribute});
  requiredValue = input(false, {transform: booleanAttribute});
  readOnly = input(false, {transform: booleanAttribute});
  autoResize = input(false, {transform: booleanAttribute, alias: "auto-resize"});

  ___textareaClasses!: string;
  ___labelClasses!: string;
  protected readonly errorMessage = errorMessage;

  constructor(
    @Optional() @Self() protected ngControl: NgControl,
  ) {
    super(inject(ChangeDetectorRef), ngControl);
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
    if (this.autoResize() && this.resizable()) {
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

    if (this.inputClassName()) {
      areaclassesBuilder.append(this.inputClassName()!);
    }
    if (this.labelClassName()) {
      labelclassesBuilder.append(this.labelClassName()!);
    }

    this.___textareaClasses = twMerge(areaclassesBuilder.segments());
    this.___labelClasses = twMerge(labelclassesBuilder.segments());

    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    if (this.contentElement) {
      const text = this.contentElement.nativeElement.textContent;
      if (StringUtils.size(text!) !== 0) {
        this.updateValue(text, false);
        this.changeDetector.markForCheck();
      }
    }
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    this.initSuper();
  }

  override handleChange($event: string, eventType: 'FOCUS' | 'INPUT' | 'BLUR' | 'KEY_UP') {
    super.handleChange($event, eventType);
    if (eventType === "INPUT") {
      this.handlerAutoResize();
    }
  }

  private handlerAutoResize = () => {
    if (this.autoResize()) {
      const el = this.textareaElement.nativeElement;
      // el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };
}
