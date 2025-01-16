import {
  AfterContentInit,
  booleanAttribute,
  Component,
  ContentChildren,
  input,
  OnInit,
  output,
  QueryList
} from '@angular/core';
import {AccordionItemComponent} from './accordion-item/accordion-item.component';
import {ObjectUtils} from 'co2m.js';

@Component({
  selector: 'ui-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  standalone: false
})
export class AccordionComponent implements OnInit, AfterContentInit {

  @ContentChildren(AccordionItemComponent)
  panels!: QueryList<AccordionItemComponent>;

  alwaysOpen = input(false, {transform: booleanAttribute});

  onCollapse = output<{ id: string | number, state: 'CLOSED' | 'OPEN' }>()

  ngAfterContentInit(): void {
    this.panels.forEach(e => {
      // console.log(e);
    })
  }

  ngOnInit(): void {
  }

  collapseCallback($data: AccordionItemComponent) {
    if ($data.expandBody && !this.alwaysOpen()) {
      const othersPanels = this.panels
        .filter(value => value !== $data);
      othersPanels.forEach(value => {
        if (value.expandBody) {
          this.onCollapse.emit({
            id: this.getPanelIdentifier(value),
            state: 'CLOSED'
          })
        }
        value.expandBody = false;
        value.accordionTitle.isActive = false;
      });
    }

    this.onCollapse.emit({
      id: this.getPanelIdentifier($data),
      state: $data.expandBody ? 'OPEN' : 'CLOSED'
    });
  }

  private getPanelIdentifier($data: AccordionItemComponent): string | number {
    let id: string | number | undefined = $data.identifier();
    if (ObjectUtils.isNullOrUndefined(id)) {
      id = Array.of(...this.panels.toArray()).findIndex(value => value === $data);
    }
    return id!;
  }
}
