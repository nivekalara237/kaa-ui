import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  inject,
  input,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractInputComponent} from '../shared/abstract-input.component';
import {ObjectUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {CardinalDirection, Size, Status} from '../../../model/types';
import {NgControl} from '@angular/forms';
import {errorMessage} from '../input/utils/errors-message-handler';

@Component({
  selector: 'ka-radio',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss', '../common/style.component.scss'],
  providers: []
})
export class RadioButtonComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  status = input<Status>('default');
  size = input<Size>('small');
  label = input<string>();
  labelPosition = input<CardinalDirection>("right");
  onlyLabel = input(false, {transform: booleanAttribute});
  disabledInput = input(false, {transform: booleanAttribute, alias: 'disabled'});
  checkedInput = input(false, {transform: booleanAttribute, alias: 'checked'});
  readOnly = input(false, {transform: booleanAttribute, alias: 'readOnly'});
  isItemGroup = false;
  el = inject(ElementRef<HTMLElement>);
  @ViewChild("inputElement")
  protected inputElement!: ElementRef<HTMLInputElement>;
  protected ___radioClass!: string;
  protected ___labelClass!: string;
  protected ___onlyLabelClass!: string;
  protected readonly errorMessage = errorMessage;

  constructor(
    @Optional() @Host() public ngControl: NgControl
  ) {
    super(inject(ChangeDetectorRef), ngControl);
  }

  compiledClasses(): string {
    const builder = new StringBuilder();
    const radioBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder("ka-radio-label");
    const onlyLabelBuilder = new StringBuilder();

    radioBuilder.append(`ka-radio-custom ka-radio-${this.status()} ka-radio-size-${this.size()}`);

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
    labelBuilder.append(this.labelClassName()!);
    onlyLabelBuilder.append(this.labelClassName()!);
    builder.append(this.inputClassName()!);

    this.___labelClass = twMerge(labelBuilder.segments());
    this.___onlyLabelClass = twMerge(onlyLabelBuilder.segments());
    return twMerge(builder.segments().filter(ObjectUtils.isNotNullAndNotUndefined));
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.initSuper();
    this.initAll();
  }

  handlerInputClick() {
    this.inputElement.nativeElement.click();
  }

  private initAll = () => {
    this.elementClass = this.compiledClasses();
    this.updateValue(this.inputValue());
  }
}
