import {Component, ElementRef, inject} from '@angular/core';

@Component({
  selector: 'ka-fe-content, ui-fe-content',
  standalone: false,

  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

  private el = inject(ElementRef<HTMLElement>);

  get element() {
    return this.el.nativeElement;
  }

}
