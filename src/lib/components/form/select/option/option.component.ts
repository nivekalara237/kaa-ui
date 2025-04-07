import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {SelectOptionItem} from '../../../../model/domain/select-option.domain';

@Component({
  selector: 'ka-option, ui-option',
  standalone: false,
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: AbstractUIComponent,
    useExisting: OptionComponent
  }],
  host: {
    "class": "select-option"
  }
})
export class OptionComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  isSelected = false;
  value = input<any>();
  extra = input<any>();
  index = input<number>();
  disabled = input(false, {transform: booleanAttribute})
  selected = new EventEmitter<{ index: number, value: SelectOptionItem }>();

  // @view handler
  @ViewChild("ngContentTpl", {read: TemplateRef, static: false}) protected valueNgContent!: TemplateRef<any>;
  @ViewChild("container", {read: ViewContainerRef}) protected container!: ViewContainerRef;
  @ViewChild("optionContent", {static: false}) protected optionContent!: ElementRef<HTMLDivElement>;
  private _value!: any;

  @HostBinding("class.selected")
  get selectedClass() {
    return this.isSelected;
  }

  @HostBinding("class.disabled")
  get disabledClass() {
    return this.disabled();
  }

  get label(): { text: string, html: HTMLElement } | string {
    const text = this.optionContent.nativeElement.textContent;
    const nodes = Array.from(this.optionContent.nativeElement.childNodes)
      .filter(value1 => value1.nodeType !== Node.COMMENT_NODE);

    if (nodes.length === 1 && nodes.at(0)?.nodeType === Node.TEXT_NODE) {
      return text!;
    }
    return {
      text: text!,
      html: this.optionContent.nativeElement
    };
  };

  override compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

  ngAfterViewInit(): void {
    this._value = this.value();
    if (this.valueNgContent) {
      const viewRef = this.valueNgContent.createEmbeddedView(null);
      if (!this._value) {
        this._value = viewRef.rootNodes.map(value1 => value1.textContent)
          .join(" ");
      }
      this.container.insert(viewRef);
    }
  }

  @HostListener("click", ["$event"])
  clicked = ($event: any) => {
    if (!this.disabled()) {
      this.selected.emit({
        index: this.index()!, value: {
          value: this.value(),
          label: this.label,
          disabled: this.disabled(),
          extraData: this.extra()
        }
      });
    }
  }
}
