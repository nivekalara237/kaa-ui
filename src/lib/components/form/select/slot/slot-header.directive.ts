import {Directive, ElementRef, inject, OnInit} from '@angular/core';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Directive({
  selector: '[kaSelectHeader]',
  host: {},
  standalone: false
})
export class SlotHeaderDirective implements OnInit {
  el = inject(ElementRef);

  constructor() {
  }

  private get clazzes() {
    const builder = new StringBuilder();
    builder.append("px-3 py-4")
      .append("border-b border-gray-200");
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    const elHtml: HTMLElement = this.el.nativeElement;
    const initialClass = (elHtml.classList.value.split(" ") || []);
    elHtml.className = twMerge(this.clazzes, initialClass);
  }

}
