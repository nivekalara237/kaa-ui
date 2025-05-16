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
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {AbstractInputComponent} from '../../shared/abstract-input.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {CheckboxControlOption} from '../../../../model/domain/checkbox.domain';
import {Orientation, Position, RoundedSize, Size, Status} from '../../../../model/types';
import {NgControl} from '@angular/forms';
import {errorMessage} from '../../input/utils/errors-message-handler';

@Component({
  selector: 'ka-checkbox-control, ui-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: [
    './checkbox-control.component.scss',
    '../../common/style.component.scss'
  ],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.Default
})
export class CheckboxControlComponent extends AbstractInputComponent implements OnInit, AfterViewInit {
  options = input.required<Array<CheckboxControlOption>>();
  required = input(false, {transform: booleanAttribute});
  layout = input<Orientation>('vertical');
  onlyLabel = input(false, {transform: booleanAttribute});
  label = input<string>();
  outline = input(false, {transform: booleanAttribute});
  ripple = input(false, {transform: booleanAttribute});
  roundedSize = input<RoundedSize>('small');
  status = input<Status>('primary');
  size = input<Size>('small');
  disabledCheckbox = input(false, {transform: booleanAttribute, alias: 'disabled'});
  readOnly = input(false, {transform: booleanAttribute});
  checked = input(false, {transform: booleanAttribute});
  labelPosition = input<Position>('right');
  protected readonly errorMessage = errorMessage;

  private selectedValues = [] as CheckboxControlOption[];

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
  }

  override writeValue(obj: any): void {
    this.value = obj ?? [];
    this.changeDetector.markForCheck();
  }

  onCheckboxChange(option: CheckboxControlOption, checked: boolean) {
    if (checked) {
      this.selectedValues.push(option);
    } else {
      this.selectedValues = this.selectedValues.filter(v => v !== option);
    }
    this.updateValue(this.selectedValues.map(value => value.value), true);
  }

  isTemplate(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
