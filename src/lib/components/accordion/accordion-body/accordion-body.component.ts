import {Component, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';

@Component({
  selector: 'ui-accordion-body',
  templateUrl: './accordion-body.component.html',
  styleUrl: './accordion-body.component.css',
  standalone: false,
})
export class AccordionBodyComponent extends AbstractUIComponent implements OnInit {
  compiledClasses(): string {
    return '';
  }

  ngOnInit(): void {
  }

}
