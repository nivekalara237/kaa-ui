import {Component, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Component({
  selector: 'ka-checkbox-custom-icon',
  standalone: false,
  templateUrl: './checkbox-custom-icon.component.html',
  styleUrl: './checkbox-custom-icon.component.css',
  providers: [{
    provide: AbstractUIComponent,
    useExisting: CheckboxCustomIconComponent
  }]
})
export class CheckboxCustomIconComponent extends AbstractUIComponent implements OnInit {
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
