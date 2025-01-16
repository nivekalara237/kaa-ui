import {Component, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Component({
  selector: 'ui-paragraph-column',
  imports: [],
  templateUrl: './paragraph-column.component.html',
  styleUrl: './paragraph-column.component.css'
})
export class ParagraphColumnComponent extends AbstractUIComponent implements OnInit {
  compiledClasses(): string {
    const builder = new StringBuilder();

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }

    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
