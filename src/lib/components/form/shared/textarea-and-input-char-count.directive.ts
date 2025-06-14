import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  numberAttribute,
  Optional,
  Renderer2
} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: 'ui-textarea[withCounter], ka-textarea[withCounter], ui-input[withCounter], ui-input[withCounter]',
  standalone: false
})
export class TextareaAndInputCharCountDirective implements AfterViewInit {

  @Input({alias: "counterMaxLength", transform: numberAttribute}) maxLength?: number;
  @Input({
    alias: "counterTextTemplate",
    // transform: genericWithDefaultAttribute<`${string} {count}` | `${string} {count}/{totalCount}`>(' {count}/{totalCount}')
  }) textTemplate?: `${string} {count}` | `${string} {count} of {totalCount}` | string;

  private counterEl!: HTMLElement;
  private targetInput!: HTMLInputElement | HTMLTextAreaElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Optional() private control: NgControl
  ) {
  }

  ngAfterViewInit() {
    this.targetInput = this.findInputOrTextarea(this.el.nativeElement);
    if (!this.targetInput) return;

    this.resolveMaxLengthFromValidator();
    this.createCounter();
    this.updateCount();
  }

  @HostListener('input')
  onInput() {
    if (!this.targetInput) return;
    this.updateCount();
  }

  private findInputOrTextarea(el: HTMLElement): HTMLInputElement | HTMLTextAreaElement {
    return el.querySelector('input, textarea')!;
  }

  private resolveMaxLengthFromValidator() {
    if (this.control?.control?.validator) {
      const result = this.control.control.validator({} as any);
      if (result?.['maxlength']) {
        this.maxLength = result['maxlength'].requiredLength;
      }
    }
  }

  private createCounter() {
    this.counterEl = this.renderer.createElement('div');
    const el = this.el.nativeElement.querySelector(".ka-input > *:first-child, .ka-textarea > *:first-child");
    const parent = this.renderer.parentNode(el);

    if (el?.nextSibling) {
      this.renderer.insertBefore(parent, this.counterEl, el.nextSibling)
    } else {
      this.renderer.appendChild(parent, this.counterEl);
    }

    const span = this.renderer.createElement('span');
    this.renderer.setAttribute(this.counterEl, "class", "flex justify-end");
    ['text-gray-400', 'dark:text-white', 'text-[10px]', 'font-medium', 'mt-1'].forEach(clss => {
      this.renderer.addClass(span, clss);
    });
    this.renderer.appendChild(this.counterEl, span);
  }

  private updateCount() {
    const length = this.targetInput?.value?.length || 0;
    const span = this.counterEl.querySelector("span")!;
    const template = this.textTemplate || "{count}" + (this.maxLength ? " of {totalCount}" : "");
    /*span.textContent = this.maxLength
      ? `${length} / ${this.maxLength}`
      : `${length}`;*/
    span.textContent = template.replace("{count}", length + "")
      .replace("{totalCount}", this.maxLength + "");
    const nearLimit = this.maxLength && length >= this.maxLength;
    if (nearLimit) {
      ["text-gray-400", "dark:text-white"]
        .forEach(value => this.renderer.removeClass(span, value));
      this.renderer.addClass(span, 'text-red-400');
    } else {
      ["text-gray-400", "dark:text-white"]
        .forEach(value => this.renderer.addClass(span, value));
      this.renderer.removeClass(span, 'text-red-400');
    }
  }
}
