import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[kaStepIcon]',
  standalone: false,
})
export class StepIconSlotDirective {
  private el = inject(ElementRef);

  constructor() {
  }

  get element() {
    return this.el.nativeElement as HTMLElement;
  }

  get html() {
    return this.element?.outerHTML;
  }

  static defaultIcon() {
    return `<svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
            </svg>`;
  }

}
