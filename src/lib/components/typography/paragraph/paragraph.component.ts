import {booleanAttribute, ChangeDetectorRef, Component, input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {paragraphFirstLetter, paragraphTextSizeMapping} from '../../../model/themes/typography.theme';
import {Size} from '../../../model/types';

type ParagraphSize = Size | 'normal';

@Component({
  selector: 'ui-paragraph',
  imports: [],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: AbstractUIComponent,
      useExisting: ParagraphComponent
    }
  ]
})
export class ParagraphComponent extends AbstractUIComponent implements OnInit {

  highlightFirst = input(false, {transform: booleanAttribute});
  firstLineUppercase = input(false, {transform: booleanAttribute});
  centered = input(false, {transform: booleanAttribute});
  toLeft = input(false, {transform: booleanAttribute});
  toRight = input(false, {transform: booleanAttribute});
  justified = input(false, {transform: booleanAttribute});
  size = input<ParagraphSize>('normal');
  italic = input(false, {transform: booleanAttribute});
  bolder = input(false, {transform: booleanAttribute});
  lighter = input(false, {transform: booleanAttribute});

  constructor(
    protected override changeDetector: ChangeDetectorRef
  ) {
    super(changeDetector);
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();

    if (this.highlightFirst()) {
      builder.append(paragraphFirstLetter)
        .append(" ");
    }

    if (this.firstLineUppercase()) {
      builder.append('first-line:uppercase')
        .append(" ");
    }
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName())
        .append(" ");
    }

    if (this.centered()) {
      builder.append("text-center").append(" ");
    }

    if (this.toLeft()) {
      builder.append("text-left").append(" ");
    }

    if (this.toRight()) {
      builder.append("text-right").append(" ");
    }

    if (this.justified()) {
      builder.append("text-justify").append(" ");
    }

    if (this.italic()) {
      builder.append("italic").append(" ");
    }

    if (this.bolder()) {
      builder.append("font-bold").append(" ");
    }

    if (this.lighter()) {
      builder.append("font-light").append(" ");
    }

    builder.append(paragraphTextSizeMapping[this.size()])
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
