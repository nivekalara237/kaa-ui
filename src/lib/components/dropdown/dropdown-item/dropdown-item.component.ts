import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';

@Component({
  selector: 'ka-dropdown-item, ui-dropdown-item',
  standalone: false,
  templateUrl: './dropdown-item.component.html',
  styleUrl: './dropdown-item.component.scss',
  providers: [{
    provide: AbstractUIComponent,
    useExisting: DropdownItemComponent
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "dropdown-item"
  }
})
export class DropdownItemComponent extends AbstractUIComponent {
  override compiledClasses(): string {
    throw new Error('Method not implemented.');
  }

}
