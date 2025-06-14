import {Component, ElementRef, inject, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ka-fe-content, ui-fe-content',
  standalone: false,

  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent {

  private el = inject(ElementRef<HTMLElement>);

  get element() {
    return this.el.nativeElement;
  }

}
