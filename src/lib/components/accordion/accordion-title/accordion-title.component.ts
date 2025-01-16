import {booleanAttribute, Component, input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';

@Component({
  selector: 'ui-accordion-title',
  templateUrl: './accordion-title.component.html',
  styleUrl: './accordion-title.component.css',
  standalone: false
})
export class AccordionTitleComponent extends AbstractUIComponent implements OnInit {
  isActive!: boolean; // this variable is handled inside the Accordion Panel (AccordionItemComponent)
  disabledIcon = input(false, {transform: booleanAttribute});
  iconPosition = input<'left' | 'right'>('left');


  compiledClasses(): string {
    return '';
  }

  ngOnInit(): void {
  }
}
