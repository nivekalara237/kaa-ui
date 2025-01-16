import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ContentChild,
  input,
  OnInit
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AccordionTitleComponent} from '../accordion-title/accordion-title.component';
import {AbstractUIComponent} from '../../abstract.component';
import {AccordionComponent} from '../accordion.component';
import {AccordionBodyComponent} from '../accordion-body/accordion-body.component';

@Component({
  selector: 'ui-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  standalone: false,
  animations: [
    trigger("expandCollapse", [
      state(
        "collapse",
        style({
          overflow: 'hidden'
        })),
      state(
        "close",
        style({
          opacity: 0,
          height: 0,
          overflow: 'hidden',
          visibility: 'hidden'
        })),
      transition('collapse <=> close', animate('200ms')),
    ])
  ]
})
export class AccordionItemComponent extends AbstractUIComponent implements OnInit, AfterContentInit {
  disabled = input(false, {transform: booleanAttribute});
  isOpen = input(false, {transform: booleanAttribute});
  identifier = input<string>();

  expandBody!: boolean;
  @ContentChild(AccordionTitleComponent)
  accordionTitle!: AccordionTitleComponent;
  @ContentChild(AccordionBodyComponent)
  accordionBodyComponent!: AccordionBodyComponent;

  constructor(
    protected override changeDetector: ChangeDetectorRef,
    private accordionParent: AccordionComponent
  ) {
    super(changeDetector);
  }

  handlerCollapsing() {
    if (this.disabled()) {
      return;
    }
    this.expandBody = !this.expandBody;
    if (this.accordionParent) {
      this.accordionParent.collapseCallback(this);
    }
    if (this.accordionTitle) {
      this.accordionTitle.isActive = this.expandBody;
    }
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.handlerCollapsing.bind(this);
    this.expandBody = this.isOpen();
    this.accordionTitle.isActive = this.isOpen();
  }

  compiledClasses(): string {
    return this.nativeClassName();
  }
}
