import {Directive, Host, Optional, TemplateRef} from '@angular/core';
import {MenuComponent} from '../menu.component';

@Directive({
  selector: 'ng-template[kaMenuFooter]',
  standalone: false
})
export class MenuFooterSlotDirective {

  constructor(
    @Optional() @Host() private menu: MenuComponent,
    private templateRef: TemplateRef<any>
  ) {
    if (!menu) {
      throw new Error('The `kaMenuFooter` directive must be used inside a <ka-menu>{...}</ui-menu> component.');
    }
  }

  get template() {
    return this.templateRef;
  }
}
