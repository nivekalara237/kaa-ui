import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  Host,
  inject,
  input,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import {AbstractInputComponent} from '../../shared/abstract-input.component';
import {CheckboxControlOption} from '../../../../model/domain/checkbox.domain';
import {CardinalDirection, Orientation, Size, Status} from '../../../../model/types';
import {NgControl} from '@angular/forms';
import {RandomUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {errorMessage} from '../../input/utils/errors-message-handler';

@Component({
  selector: 'ka-radio-control, ui-radio-control',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.scss',
    '../../common/style.component.scss'
  ],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class RadioControlComponent extends AbstractInputComponent implements OnInit, AfterViewInit {
  options = input.required<Array<CheckboxControlOption>>();
  required = input(false, {transform: booleanAttribute});
  layout = input<Orientation>('vertical');
  status = input<Status>('default');
  size = input<Size>('small');
  label = input<string>();
  labelPosition = input<CardinalDirection>("right");
  onlyLabel = input(false, {transform: booleanAttribute});
  disabledInput = input(false, {transform: booleanAttribute, alias: 'disabled'});
  readOnly = input(false, {transform: booleanAttribute, alias: 'readOnly'});
  protected readonly errorMessage = errorMessage;

  protected _name!: string;

  constructor(
    @Optional() @Host() public ngControl: NgControl
  ) {
    super(inject(ChangeDetectorRef), ngControl);
  }

  compiledClasses(): string {
    const builder = new StringBuilder();

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    this.initSuper();
    this._name = this.name() ?? `radio--${RandomUtils.secureChars(12)}`
  }

  onRadioChange(option: CheckboxControlOption, selected: boolean) {

  }
}
