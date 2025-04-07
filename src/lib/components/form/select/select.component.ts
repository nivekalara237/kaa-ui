import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  OnInit,
  output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {RandomUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {AbstractInputComponent} from '../shared/abstract-input.component';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputVariant, RoundedSize, Size} from '../../../model/types';
import {SelectOptionItem} from '../../../model/domain/select-option.domain';
import {computePosition, ComputePositionReturn, flip, offset, shift} from '@floating-ui/dom';
import {OptionComponent} from './option/option.component';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ka-select, ui-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss','./variant.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0.9)'}),
        animate('200ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({opacity: 0, transform: 'scale(0.9)'}))
      ])
    ]),
    trigger("multipleSelectionListAnimation", [
      transition("* <=> *", [
        query(":enter", [
          style({opacity: 0, transform: 'scale(0.9)'}),
          stagger(100, [
            animate('1000ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
          ])
        ], {optional: true}),
        query(':leave', [
          animate('1000ms ease-in', style({opacity: 0, transform: 'scale(0.95)'}))
        ], {optional: true})
      ])
    ])
  ]
})
export class SelectComponent extends AbstractInputComponent implements OnInit, AfterViewInit {

  @ViewChild("parentElement", {static: false})
  parentElement!: ElementRef<HTMLDivElement>;
  @ContentChildren(OptionComponent, {})
  _optionsComponents2!: QueryList<OptionComponent>;
  override inputValue = input<any>(null, {
    alias: "value"
  });
  options = input<SelectOptionItem[]>([]);
  selectFieldId = input<string>();
  label = input<string>();
  placeholder = input<string>("Select options");
  requiredValue = input(false, {transform: booleanAttribute});
  readOnly = input(false, {transform: booleanAttribute});
  variant = input<InputVariant>('basic');
  roundedSize = input<RoundedSize>('small');
  size = input<Size>('medium');
  floatingLabel = input(false, {transform: booleanAttribute});
  multiple = input(false, {transform: booleanAttribute});
  filter = input(false, {transform: booleanAttribute});
  // eventemitter
  selectionChange = output<{ index?: number, item: any, type: 'ADD' | 'DELETE', selected?: any }>();
  filterChange = output<any>();
  filterText: string = '';
  // private attributes
  protected __id!: string;
  protected selectedValue: SelectOptionItem[] = [];
  protected opened = false;
  private listboxElement!: HTMLElement;
  private inputElement!: HTMLElement;
  private internalOptions: SelectOptionItem[] = [];

  @ViewChildren(OptionComponent)
  _optionsComponents!: QueryList<OptionComponent>;

  get optionsComponents(): QueryList<OptionComponent> {
    if (this._optionsComponents && this._optionsComponents.length > 0) {
      return this._optionsComponents;
    }
    return this._optionsComponents2;
  }

  private get mergedOptions(): SelectOptionItem[] {
    return this.options().length > 0 ? this.options() : this.internalOptions;
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    this.__id = this.id();
    this.elementClass = this.compiledClasses();
    if (this.inputValue()) {
      if (this.multiple()) {
        const linearizedArray = Array.isArray(this.inputValue()) ? Array.of(...this.inputValue()) : [this.inputValue()];
        this.selectedValue = this.mergedOptions.filter(value => linearizedArray.includes(value.value));
      } else {
        const item = this.mergedOptions.find(value => value.value === this.inputValue());
        this.selectedValue = item ? [item] : [];
      }
    }

    this.updateFormControl();
  }

  ngAfterViewInit(): void {
    if (!this.disabled && !this.readOnly()) {
      this.init();
      this.optionsComponents.changes.subscribe(this.subscribeToOptionClicks);
      this.subscribeToOptionClicks();
    }

    this.handleListboxCheckbox();
  }

  id = () => this.selectFieldId() ? this.selectFieldId()! : RandomUtils.secureChars(12);

  @HostListener("document:click", ["$event"])
  clickOutside = ($event: any) => {
    const multipleSelectItems = this.parentElement.nativeElement
      .querySelector(".select-base .select-input #multiple-select-items");

    const triggerEl: HTMLElement = this.listboxElement;
    const clickedEl = $event.target as HTMLElement;
    const triggerClicked = triggerEl.contains(clickedEl)
      || triggerEl.isEqualNode(clickedEl);
    if (
      !triggerClicked &&
      !this.inputElement.contains(clickedEl) &&
      !multipleSelectItems?.contains(clickedEl)
    ) {
      this.opened = false;
      this.showOrHideListBox(true);
    }
  }

  removeSelectValue(item: SelectOptionItem, index: number) {
    this.selectedValue = this.selectedValue.filter(value => value.value !== item.value);
    this.updateFormControl(item, index, "DELETE");
    this.handleListboxCheckbox();
  }

  private convertOptions = () => {
    this.internalOptions = this.optionsComponents.map(option => ({
      value: option.value(),
      label: option.label,
      disabled: option.disabled(),
      extraData: option.extra(),
    }));
  };

  private subscribeToOptionClicks = () => {
    this.convertOptions();
    this.optionsComponents.forEach((component, index) => {
      component.selected.subscribe(value => {
        if (!this.multiple()) {
          this.showOrHideListBox(true);
        }
        this.handleOptionClick(index, value.value);
        this.handleListboxCheckbox();
        setTimeout(() => this.updateListbox(), 50);
      });
    });
  };

  private toggleMultiSelect = (option: SelectOptionItem) => {
    const value = option.value;
    const selected = this.selectedValue || [];
    return selected.findIndex(v => v.value === value) !== -1
      ? selected.filter(v => v.value !== value)
      : [...selected, option];
  };

  private isSelected(option: SelectOptionItem) {
    if (this.multiple()) {
      return (this.selectedValue || []).findIndex(value => value.value === option.value) !== -1;
    }
    return (this.selectedValue || []).at(0)?.value === option.value;
  }

  private handleOptionClick = (idx: number, option: SelectOptionItem) => {
    let items: SelectOptionItem[];

    if (!this.multiple()) {
      items = [this.mergedOptions.find(value => value.value === option.value)!];
    } else {
      items = this.toggleMultiSelect(option);
    }
    this.selectedValue = items;
    this.updateFormControl(option, idx, "ADD");
  };

  private init = () => {
    const parentElement = this.parentElement.nativeElement;
    const input = parentElement.querySelector("#input-select") as HTMLElement;
    const listbox = parentElement.querySelector(`#floating-block`) as HTMLElement;
    this.listboxElement = listbox;
    this.inputElement = input;
    const dropdown = ($event: Event) => {
      const selectedItems = document.querySelector(".select-base .select-input #multiple-select-items");
      if (selectedItems && selectedItems.childNodes.length > 0) {
        const children = (() => {
          const c = [];
          for (let i = 0; i < selectedItems.children.length; i++) {
            c.push(selectedItems.children.item(i));
          }
          return c.filter(value => !!value);
        })();
        const isSelectedItemClicked = children.some(el => el.contains($event.target as HTMLElement));
        if (isSelectedItemClicked) {
          setTimeout(() => this.updateListbox(), 50);
          return;
        }
      }

      listbox.classList.toggle("hidden");
      this.opened = !this.opened;
      if (this.opened) {
        setTimeout(() => this.updateListbox(), 50);
      }
    };
    input.addEventListener("click", dropdown);
  };

  private showOrHideListBox = (hide?: boolean) => {
    if (hide) {
      this.listboxElement.classList.add("hidden");
    } else {
      this.listboxElement.classList.remove("hidden");
    }
  };

  private updateListbox = () => {
    computePosition(this.inputElement.querySelector(".select-input")!, this.listboxElement, {
      middleware: [
        flip(),
        shift({padding: 8}),
        offset({mainAxis: 2})
      ],
      placement: "bottom"
    })
      .then((position: ComputePositionReturn) => {
        ["rounded-t-md", "rounded-b-md", "rounded-l-md", "rounded-r-md"]
          .forEach(v => this.listboxElement.classList.remove(v));
        this.listboxElement.classList.add(`rounded-${position.placement.at(0)}-md`);
        Object.assign(this.listboxElement.style, {
          left: position.x + "px",
          top: position.y + "px",
        });
      });
  }

  private updateFormControl(option?: SelectOptionItem, indexImpacted?: number, eventType: 'ADD' | 'DELETE' = "ADD") {
    this.selectionChange.emit({index: indexImpacted, item: option, type: eventType, selected: this.selectedValue});
    this.setValue(
      this.multiple() ?
        this.selectedValue.map(value => value.value) :
        option?.value, true);
    this.changeDetector.markForCheck();
  }

  private handleListboxCheckbox() {
    // component.isMultiSelect = true;
    const selectedValues = this.selectedValue.map(v => v.value);
    this.optionsComponents.forEach(option => {
      option.isSelected = selectedValues.includes(option.value());
    });
  }
}
