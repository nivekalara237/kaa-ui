import {Directive} from '@angular/core';

@Directive({
  selector: 'ui-drawer[kaSwipeable], ka-drawer[kaSwipeable]',
  standalone: false
})
export class SwipeableDirective {

  constructor() {
  }

}
