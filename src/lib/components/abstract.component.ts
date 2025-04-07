import {
  booleanAttribute,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  input,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {BooleanUtils} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Directive({
  host: {
    "ngSkipHydration": ''
  }
})
export abstract class AbstractUIComponent implements OnChanges {
  nativeClassName = input<string>("");
  protected elementClass!: string;

  constructor(
    protected changeDetector: ChangeDetectorRef
  ) {
  }

  private _noBorder!: boolean;

  @Input({alias: "no-border", transform: booleanAttribute})
  @HostBinding("class.border-none")
  @HostBinding("class.transition")
  get noBorder(): boolean {
    return this._noBorder;
  }

  set noBorder(value: boolean) {
    this._noBorder = BooleanUtils.toBoolean(value);
  }

  abstract compiledClasses(): string;

  addClass = (...classes: string[]) => {
    this.elementClass = twMerge([this.elementClass, ...classes]);
    this.changeDetector.markForCheck();
  };

  ngOnChanges(changes: SimpleChanges): void {
    const changed = Object.keys(changes);
    let hasChanged = false;
    changed.forEach(value => {
      const it = changes[value];
      if (!it.isFirstChange() && it.currentValue !== it.previousValue) {
        hasChanged = true;
      }
    });
    if (hasChanged) {
      this.changeDetector.detectChanges();
      this.elementClass = this.compiledClasses();
    }
  }
}
