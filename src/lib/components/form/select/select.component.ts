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
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {RandomUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {AbstractInputComponent} from '../shared/abstract-input.component';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HorizontalPosition, IconVariant, InputVariant, RoundedSize, Size} from '../../../model/types';
import {SelectOption} from '../../../model/domain/select-option.domain';
import {computePosition, ComputePositionReturn, flip, offset, shift} from '@floating-ui/dom';
import {OptionComponent} from './option/option.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {inputIconSize} from '../../../model/themes/input.theme';
import {GroupOptionComponent} from './group/group-option.component';

@Component({
  selector: 'ka-select, ui-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss', './variant.scss'],
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
  host: {
    "class": "h-max"
  },
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0.9)'}),
        animate('200ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({opacity: 0, transform: 'scale(0.9)'}))
      ])
    ])
  ]
})
export class SelectComponent extends AbstractInputComponent implements OnInit, AfterViewInit {
  @ViewChild("parentElement", {static: false})
  parentElement!: ElementRef<HTMLDivElement>;
  @ContentChildren(OptionComponent, {})
  _optionsComponents2!: QueryList<OptionComponent>;
  @ContentChildren(GroupOptionComponent, {})
  _groupOptionsComponents2!: QueryList<GroupOptionComponent>;

  override inputValue = input<any>(null, {
    alias: "value"
  });
  options = input<SelectOption[]>([]);
  selectFieldId = input<string>();
  optionValueKey = input<string>();
  optionLabelKey = input<string>();
  label = input<string>();
  placeholder = input<string>("Select option");
  requiredValue = input(false, {transform: booleanAttribute});
  readOnly = input(false, {transform: booleanAttribute});
  variant = input<InputVariant>('basic');
  roundedSize = input<RoundedSize>('small');
  size = input<Size>('medium');
  floatingLabel = input(false, {transform: booleanAttribute});
  multiple = input(false, {transform: booleanAttribute});
  filter = input(false, {transform: booleanAttribute});
  iconVariant = input<IconVariant>('pi');
  iconName = input<string>();
  iconPosition = input<HorizontalPosition>("left");
  labelRenderTemplate = input<TemplateRef<any>>();
  // eventemitter
  selectionChange = output<{ index?: number, item: any, type: 'ADD' | 'DELETE', selected?: any }>();
  filterChange = output<any>();
  filterText: string = '';
  _inputCssClass = '';
  _labelCssClass = '';
  _isInputFocused = false;
  @ViewChildren(GroupOptionComponent)
  _groupOptionsComponents!: QueryList<GroupOptionComponent>;
  // private attributes
  protected __id!: string;
  protected selectedValue: SelectOption[] = [];
  protected opened = false;
  protected readonly inputIconSize = inputIconSize;
  private listboxElement!: HTMLElement;
  private inputElement!: HTMLElement;
  private internalOptions: SelectOption[] = [];

  @ViewChildren(OptionComponent)
  _optionsComponents!: QueryList<OptionComponent>;

  get optionsComponents(): [QueryList<OptionComponent>, QueryList<GroupOptionComponent>] {
    const merged = (options: QueryList<OptionComponent>, groups: QueryList<GroupOptionComponent>) => {
      const optsOutsideGroup = options && options.length > 0 ? options : new QueryList<OptionComponent>();
      const optsInsideGroup = groups && groups.length > 0 ? groups : new QueryList<GroupOptionComponent>();
      const pair: [QueryList<OptionComponent>, QueryList<GroupOptionComponent>] = [optsOutsideGroup, optsInsideGroup];
      return pair;
    };
    const opts = merged(this._optionsComponents, this._groupOptionsComponents);
    if (opts.at(0)!.length > 0 || opts.at(1)!.length > 0) {
      return opts;
    }
    return merged(this._optionsComponents2, this._groupOptionsComponents2);
  }

  protected get mergedOptions(): SelectOption[] {
    return this.options().length > 0 ? this.options() : this.internalOptions;
  }

  registerOnValidatorChange(fn: { (): void }): void {
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();
    const inputBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder();

    labelBuilder.append("ms-2");
    inputBuilder.append(`ka-input-rounded-${this.roundedSize()}`);
    inputBuilder.append(`ka-input ka-input-${this.size()}`);
    inputBuilder.append(`ka-input-v-${this.variant()}`);

    if (this.floatingLabel()) {
      inputBuilder.append("peer ka-input-floating");
      if (this.iconName() && this.iconPosition() === 'left') {
        labelBuilder.append("ms-9");
      }
      labelBuilder.append("ka-input-floating")
        .append("top-0 left-0 translate-y-1/2")
        .append("peer-focus:-translate-y-3 peer-focus:text-sm peer-focus:ms-4 peer-focus:bg-white dark:peer-focus:bg-gray-700")
        .append("peer-has-[.for-peer-fl]:-translate-y-3 peer-has-[.for-peer-fl]:text-sm peer-has-[.for-peer-fl]:ms-4 peer-has-[.for-peer-fl]:bg-white dark:peer-has-[.for-peer-fl]:bg-transparent")
        .append("peer-has-[.for-peer-fl]:bg-gradient-to-t peer-has-[.for-peer-fl]:from-gray-100 peer-has-[.for-peer-fl]:to-transparent dark:peer-has-[.for-peer-fl]:to-transparent")
        .append("dark:peer-has-[.for-peer-fl]:from-gray-700 dark:peer-has-[.for-peer-fl]:to-transparent");
    }

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }

    this._inputCssClass = twMerge(inputBuilder.segments());
    this._labelCssClass = twMerge(labelBuilder.segments());
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
      this.optionsComponents.forEach(value => value.changes.subscribe(this.subscribeToOptionClicks));
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
      this.showOrHideListBox(true);
      this.opened = false;
    }
  }

  removeSelectValue(item: SelectOption, index: number) {
    this.selectedValue = this.selectedValue.filter(value => value.value !== item.value);
    this.updateFormControl(item, index, "DELETE");
    this.handleListboxCheckbox();
  }

  handlerInputFocus(type: 'IN' | 'OUT') {
    this._isInputFocused = type === 'IN';
  }

  private convertOptions = () => {
    this.internalOptions = this.optionsComponents
      .map(this.getCallbackfn())
      .flatMap(value => [...value])
      .map(option => ({
        value: option.value(),
        label: option.label,
        disabled: option.disabled(),
        extraData: option.extra(),
      }));
  };

  private getCallbackfn() {
    return (value: { toArray: () => any; }) => {
      const o = value.toArray();
      if (o.length === 0) {
        return [] as OptionComponent[];
      }
      if (o.at(0) instanceof OptionComponent) {
        return o as OptionComponent[];
      } else {
        const g: GroupOptionComponent[] = o as GroupOptionComponent[];
        return g.flatMap(value => value.optionComponents.toArray());
      }
    };
  }

  private subscribeToOptionClicks = () => {
    this.convertOptions();
    this.optionsComponents.map(this.getCallbackfn())
      .flatMap(value => [...value])
      .forEach((component, index) => {
        component.selected.subscribe(value => {
          if (!this.multiple()) {
            this.showOrHideListBox(true);
          }
          this.handleOptionClick(index, value.value);
          this.handleListboxCheckbox();
          // setTimeout(() => this.updateListbox(), 10);
        });
      });
  };

  private toggleMultiSelect = (option: SelectOption) => {
    const value = option.value;
    const selected = this.selectedValue || [];
    return selected.findIndex(v => v.value === value) !== -1
      ? selected.filter(v => v.value !== value)
      : [...selected, option];
  };

  private isSelected(option: SelectOption) {
    if (this.multiple()) {
      return (this.selectedValue || []).findIndex(value => value.value === option.value) !== -1;
    }
    return (this.selectedValue || []).at(0)?.value === option.value;
  }

  private handleOptionClick = (idx: number, option: SelectOption) => {
    let items: SelectOption[];

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
    const dropdown = ($event: any) => {
      const selectedItems = parentElement.querySelector(".select-base .select-input #multiple-select-items");
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
          setTimeout(() => this.updateListbox(), 10);
          return;
        }
      }

      listbox.classList.toggle("hidden");
      this.opened = !this.opened;
      if (this.opened) {
        setTimeout(() => this.updateListbox(), 10);
      }
    };
    input.addEventListener("click", dropdown);
    input.addEventListener("keydown", function (event: any) {
      if (event.key === 'Enter') dropdown(event);
    });
  };

  private showOrHideListBox = (hide?: boolean) => {
    if (hide) {
      this.listboxElement.classList.add("hidden");
    } else {
      this.listboxElement.classList.remove("hidden");
    }
  };

  private updateListbox = () => {
    const referenceEl = this.inputElement.querySelector(".select-input")!;
    computePosition(referenceEl, this.listboxElement, {
      middleware: [
        flip(),
        shift({padding: 8}),
        offset({mainAxis: 2}),
        // autoPlacement()
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

  private updateFormControl(option?: SelectOption, indexImpacted?: number, eventType: 'ADD' | 'DELETE' = "ADD") {
    if (option) {
      this.selectionChange.emit({index: indexImpacted, item: option, type: eventType, selected: this.selectedValue});
    }

    this.updateValue(
      this.multiple() ?
        this.selectedValue.map(value => value.value) :
        option?.value, true);
    this.changeDetector.markForCheck();
  }

  private handleListboxCheckbox() {
    // component.isMultiSelect = true;
    const selectedValues = this.selectedValue.map(v => v.value);
    this.optionsComponents.map(this.getCallbackfn())
      .flatMap(value => [...value]).forEach(option => {
      option.isSelected = selectedValues.includes(option.value());
    });
  }
}
