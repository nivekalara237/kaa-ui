import {AfterViewInit, Directive, ElementRef, Host, inject, OnInit, Optional, TemplateRef} from '@angular/core';
import {DrawerComponent} from '../drawer.component';

@Directive({selector: '[kaDrawerFooter]', standalone: false})
export class DrawerFooterDirective implements AfterViewInit, OnInit {

  private el = inject(ElementRef);

  constructor(
    @Optional() @Host() public drawer: DrawerComponent,
    @Optional() private templateRef: TemplateRef<any>
  ) {
    if (!this.drawer) {
      throw new Error('The `kaDraweFooter` directive must be used inside a <ka-drawer>{...}</ui-drawer> component.');
    }
  }

  ngAfterViewInit(): void {
    // console.log({el: this.el, tpl: this.templateRef});
  }

  ngOnInit() {
    // console.log({el2: this.el, tpl2: this.templateRef});
  }

  get template() {
    return this.templateRef;
  }
}
