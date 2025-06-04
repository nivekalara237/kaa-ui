import {Directive, ElementRef, inject, OnInit} from '@angular/core';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Directive({
  selector: '[kaSelectEmpty]',
  standalone: false
})
export class SlotEmptyDirective implements OnInit {
  el = inject(ElementRef);

  constructor() {
  }

  private get classes() {
    const builder = new StringBuilder();
    builder.append("my-5")
      .append("w-full flex justify-center items-center");
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    const elHtml: HTMLElement = this.el.nativeElement;
    const initialClass = (elHtml.classList.value.split(" ") || []);
    elHtml.className = twMerge(this.classes, initialClass);
  }

}
