import {ChangeDetectorRef, Component, input, OnInit} from '@angular/core';
import {StringBuilder, StringUtils} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from '@angular/common';
import {AbstractUIComponent} from '../abstract.component';
import {Color, Heading, Typography} from '../../model/types';
import {typographyTextColor300Mapping, variantBase} from '../../model/themes/typography.theme';

@Component({
  selector: 'ui-typography',
  imports: [
    NgTemplateOutlet,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.css',
  providers: [{
    provide: AbstractUIComponent,
    useExisting: TypographyComponent,
    multi: true
  }]
})
export class TypographyComponent extends AbstractUIComponent implements OnInit {
  variant = input.required<Typography>();
  color = input<Color>();

  constructor(
    protected override changeDetector: ChangeDetectorRef
  ) {
    super(changeDetector);
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();

    if (!StringUtils.isEmpty(this.color()!)) {
      builder.append(typographyTextColor300Mapping[this.color()!])
        .append(" ")
        .append(variantBase[<Heading>this.variant()])
        .append(" ");
    } else {
      builder.append("dark:text-white text-slate-900")
        .append(" ")
        .append(variantBase[<Heading>this.variant()])
        .append(" ");
    }
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()!).append(" ");
    }

    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }
}
