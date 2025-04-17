import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  input,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {SelectOption} from '../../../../model/domain/select-option.domain';
import {OptionComponent} from '../option/option.component';

@Component({
  selector: 'ka-group-option, ui-group-option',
  standalone: false,
  templateUrl: './group-option.component.html',
  styleUrl: './group-option.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: AbstractUIComponent,
      useExisting: GroupOptionComponent
    }
  ]
})
export class GroupOptionComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  key = input<string>();
  label = input.required<string>();
  children = input<Array<SelectOption>>();

  @ContentChildren(OptionComponent)
  internalOptionComponents!: QueryList<OptionComponent>;
  @ViewChildren(OptionComponent)
  externalOptionComponents!: QueryList<OptionComponent>;

  private internalOptions: SelectOption[] = [];

  get optionComponents() {
    if (this.children() && this.children()!.length > 0) {
      return this.externalOptionComponents;
    }
    return this.internalOptionComponents;
  }

  get options() {
    if (this.children() && this.children()!.length > 0) {
      return this.children()!
    }
    return this.internalOptions;
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

  ngAfterViewInit(): void {
    this.internalOptions = this.internalOptionComponents.map(option => ({
      value: option.value(),
      label: option.label,
      disabled: option.disabled(),
      extraData: option.extra(),
    }));
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments())
  }
}
