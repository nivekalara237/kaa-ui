import {Directive, ElementRef, Host, inject, Optional, TemplateRef} from '@angular/core';
import {StepperComponent} from '../stepper.component';

@Directive({
  selector: '[kaStepperFinalContent]',
  standalone: false
})
export class StepperFinalContentSlotDirective {
  private el = inject(ElementRef);

  constructor(
    @Optional() @Host() public stepper: StepperComponent,
    @Optional() private templateRef: TemplateRef<any>,
  ) {
    if (!this.stepper) {
      throw new Error('The `kaStepperFinalContent` directive must be used inside a <ka-stepper>/<ui-stepper> component.');
    }
  }

  get element() {
    return this.el.nativeElement as HTMLElement;
  }

  get template() {
    return this.templateRef;
  }

}
