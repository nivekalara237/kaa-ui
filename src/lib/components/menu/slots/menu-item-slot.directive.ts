import {Directive, Host, Optional, TemplateRef} from '@angular/core';
import {MenuComponent} from '../menu.component';

@Directive({
  selector: 'ng-template[kaMenuItem]',
  standalone: false
})
export class MenuItemSlotDirective {

  constructor(
    @Optional() @Host() private menu: MenuComponent,
    private templateRef: TemplateRef<any>
  ) {
    if (!menu) {
      throw new Error('The `kaMenuItem` directive must be used inside a <ka-menu>{...}</ui-menu> component.');
    }
  }

  get template() {
    return this.templateRef;
  }
}
