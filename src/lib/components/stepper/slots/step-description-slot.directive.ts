import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[kaStepDescription]',
  standalone: false,
})
export class StepDescriptionSlotDirective {
  private el = inject(ElementRef);

  constructor() {
  }

  get element() {
    return this.el.nativeElement as HTMLElement;
  }

}
