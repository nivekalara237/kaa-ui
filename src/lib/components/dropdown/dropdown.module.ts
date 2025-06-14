import {NgModule} from '@angular/core';
import {DropdownComponent} from './dropdown.component';
import {DropdownItemComponent} from './dropdown-item/dropdown-item.component';
import {ButtonComponent} from '../button/button.component';
import {AsyncPipe, NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {IconComponent} from "../icon/icon.component";

@NgModule({
  imports: [
    ButtonComponent,
    NgIf,
    NgTemplateOutlet,
    NgClass,
    AsyncPipe,
    IconComponent
  ],
  exports: [
    DropdownComponent,
    DropdownItemComponent
  ],
  declarations: [
    DropdownComponent,
    DropdownItemComponent
  ],
})
export class DropdownModule {
}
