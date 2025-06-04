import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatingElementComponent} from './floating-element/floating-element.component';
import {TriggerDirective} from './floating-element/trigger.directive';
import {TriggerComponent} from './floating-element/trigger/trigger.component';
import {ContentComponent} from './floating-element/content/content.component';
import {FloatingElementDirective} from './directives/floating-element.directive';
import {KaPopoverDirective} from './directives/popover';


@NgModule({
  declarations: [
    FloatingElementComponent,
    TriggerDirective,
    TriggerComponent,
    ContentComponent,
    FloatingElementDirective,
    KaPopoverDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FloatingElementComponent,
    TriggerDirective,
    TriggerComponent,
    ContentComponent,
    FloatingElementDirective,
    KaPopoverDirective
  ]
})
export class CommonUiModule {
}
