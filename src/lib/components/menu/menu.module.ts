import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {IconComponent} from '../icon/icon.component';
import {MenuItemSlotDirective} from './slots/menu-item-slot.directive';
import {BadgeComponent} from '../badge/badge.component';
import {MenuHeaderSlotDirective} from './slots/menu-header-slot.directive';
import {MenuFooterSlotDirective} from './slots/menu-footer-slot.directive';

@NgModule({
  declarations: [
    MenuComponent,
    MenuItemComponent,
    MenuItemSlotDirective,
    MenuHeaderSlotDirective,
    MenuFooterSlotDirective
  ],
  imports: [
    CommonModule,
    IconComponent,
    BadgeComponent,
  ],
  exports: [
    MenuComponent,
    MenuItemComponent,
    MenuItemSlotDirective,
    MenuHeaderSlotDirective,
    MenuFooterSlotDirective
  ]
})
export class MenuModule {
}
