import {booleanAttribute, Component, ElementRef, Host, HostListener, inject, input, OnInit} from '@angular/core';
import {FloatingElementComponent} from '../floating-element.component';

@Component({
  selector: 'ka-fe-trigger, ui-fe-trigger',
  standalone: false,
  templateUrl: './trigger.component.html',
  styleUrl: './trigger.component.scss'
})
export class TriggerComponent implements OnInit {
  action = input<'click' | 'hover'>('click');
  backdrop = input(false, {transform: booleanAttribute});

  private el = inject(ElementRef<HTMLElement>);

  constructor(
    @Host() private host: FloatingElementComponent,
    private elementRef: ElementRef<HTMLElement>
  ) {
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.backdrop()) {

    }
  }

  @HostListener("click", ["$event"])
  onClick(event: Event) {
    if (this.action() === 'click') {
      this.host.toggle();
      if (!this.host.open && !this.host.closeOutsideClick()) {

      }
    }
  }

  @HostListener("mouseenter", ["$event"])
  onHover(event: MouseEvent) {
    if (this.action() === 'hover') {
      this.host.toggle();
    }
  }
}
