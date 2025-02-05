import {Component, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Component({
  selector: 'ka-radio-label',
  standalone: false,
  templateUrl: './label.component.html',
  styleUrl: './label.component.css',
  providers: [{
    provide: AbstractUIComponent,
    useExisting: RadioLabelComponent
  }]
})
export class RadioLabelComponent extends AbstractUIComponent implements OnInit {
  compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
