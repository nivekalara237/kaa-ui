import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[kaStepperOutlet]',
  exportAs: 'outlet',
  standalone: false
})
export class StepperOutletDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
  }

}
