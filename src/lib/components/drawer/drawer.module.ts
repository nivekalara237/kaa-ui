import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrawerComponent} from './drawer.component';
import {SwipeableDirective} from './swipeable.directive';
import {DrawerTriggerDirective} from './drawer-trigger.directive';
import {DrawerHeaderDirective} from './slots/header.directive';
import {ButtonComponent} from '../button/button.component';
import {DrawerHeadlessDirective} from './slots/headless.directive';
import {DrawerFooterDirective} from './slots/footer.directive';


@NgModule({
  declarations: [
    DrawerComponent,
    SwipeableDirective,
    DrawerTriggerDirective,
    DrawerHeaderDirective,
    DrawerHeadlessDirective,
    DrawerFooterDirective
  ],
  imports: [
    CommonModule,
    ButtonComponent
  ],
  exports: [
    DrawerComponent,
    DrawerTriggerDirective,
    DrawerHeaderDirective,
    DrawerHeadlessDirective,
    DrawerFooterDirective

  ]
})
export class DrawerModule {
}
