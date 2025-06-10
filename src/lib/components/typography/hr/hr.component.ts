import {booleanAttribute, Component, input, numberAttribute, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {Color, Size} from '../../../model/types';
import {hrSize, typographyHrColorMapping} from '../../../model/themes/typography.theme';
import {NgIf, NgStyle} from '@angular/common';

type SizeType = Size | 'full';

@Component({
  selector: 'ui-hr',
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: AbstractUIComponent,
    useExisting: HrComponent,
    multi: true
  }]
})
export class HrComponent extends AbstractUIComponent implements OnInit {

  color = input<Color>('gray');
  size = input<SizeType>('medium');
  insertIcon = input(false, {transform: booleanAttribute});
  insertText = input(false, {transform: booleanAttribute});
  margin = input(24, {transform: numberAttribute});

  protected styles: { [k: string]: string } = {};

  override compiledClasses(): string {
    const builder = new StringBuilder();

    builder.append(typographyHrColorMapping[this.color()]).append(" ");
    builder.append(hrSize[this.size()]).append(" ");
    builder.append(`mx-auto border-0 rounded`).append(" ");

    this.styles = {
      'margin-top': `${this.margin()}px`,
      'margin-bottom': `${this.margin()}px`
    };
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
