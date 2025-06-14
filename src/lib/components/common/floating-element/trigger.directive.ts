import {Directive, ElementRef, input, Optional, TemplateRef} from '@angular/core';
import {FloatingElementComponent} from './floating-element.component';

@Directive({
  selector: '[kaFeTrigger]',
  standalone: false
})
export class TriggerDirective {

  floatingElement = input.required<FloatingElementComponent>();
  action = input<'click' | 'hover'>('click');

  constructor(
    @Optional() private templateRef: TemplateRef<any>,
    @Optional() private elementRef: ElementRef<HTMLElement>,
  ) { }

  get template(): TemplateRef<any> | undefined{
    return this.templateRef;
  }

  get element() : HTMLElement | undefined{
    return this.elementRef?.nativeElement;
  }

  get sourceElement() : HTMLElement | undefined{
    if (this.elementRef?.nativeElement) {
      return this.elementRef.nativeElement;
    } else if (this.templateRef?.elementRef) {
      return this.templateRef.elementRef.nativeElement;
    } else {
      return undefined;
    }
  }

}
