import {Component, ElementRef, inject, input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {Size} from '../../../../model/types';

@Component({
  selector: 'ka-checkbox-custom-icon',
  standalone: false,
  templateUrl: './checkbox-custom-icon.component.html',
  styleUrl: './checkbox-custom-icon.component.css',
  providers: [{
    provide: AbstractUIComponent,
    useExisting: CheckboxCustomIconComponent
  }],
  host: {
    'class': `pointer-events-none col-start-1 row-start-1 self-center justify-self-center`
  }
})
export class CheckboxCustomIconComponent extends AbstractUIComponent implements OnInit {

  type = input.required<'on' | 'off'>();
  size = input<Size>();
  checked = false;
  private el = inject(ElementRef);

  compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    // console.log(this.el.nativeElement);

    if (this.checked) {
      if (this.type() === 'off') {
        this.el.nativeElement.remove()
      } else {

      }
    }

  }
}
