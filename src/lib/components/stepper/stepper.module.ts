import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepperComponent} from './stepper.component';
import {StepComponent} from './step/step.component';
import {StepDescriptionSlotDirective} from './slots/step-description-slot.directive';
import {StepIconSlotDirective} from './slots/step-icon-slot.directive';
import {StepContentSlotDirective} from './slots/step-content-slot.directive';
import {StepperFinalContentSlotDirective} from './slots/stepper-final-content-slot.directive';
import {StepperOutletDirective} from './stepper-outlet.directive';
import {ButtonComponent} from '../button/button.component';


@NgModule({
  declarations: [
    StepperComponent,
    StepComponent,
    StepDescriptionSlotDirective,
    StepIconSlotDirective,
    StepContentSlotDirective,
    StepperFinalContentSlotDirective,
    StepperOutletDirective
  ],
  imports: [
    CommonModule,
    ButtonComponent
  ],
  exports: [
    StepperComponent,
    StepComponent,
    StepDescriptionSlotDirective,
    StepIconSlotDirective,
    StepContentSlotDirective,
    StepperFinalContentSlotDirective,
    StepperOutletDirective
  ]
})
export class StepperModule {
}
