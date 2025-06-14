import {Component, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';

@Component({
  selector: 'ka-menu-item, ui-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  standalone: false
})
export class MenuItemComponent extends AbstractUIComponent implements OnInit {
  override compiledClasses(): string {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
