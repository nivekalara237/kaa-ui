import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion.component';
import {AccordionItemComponent} from './accordion-item/accordion-item.component';
import {AccordionTitleComponent} from './accordion-title/accordion-title.component';
import {AccordionBodyComponent} from './accordion-body/accordion-body.component';


@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTitleComponent,
    AccordionBodyComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTitleComponent,
    AccordionBodyComponent
  ]
})
export class AccordionModule {
}
