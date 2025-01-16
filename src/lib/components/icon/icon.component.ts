import {booleanAttribute, Component, input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {StringBuilder} from 'co2m.js';
import {Color, IconVariant, Size, Status} from '../../model/types';
import {twMerge} from 'tailwind-merge';
import {textColorAndStatusWithDensityMapping} from '../../model/themes/common.theme';
import {iconVariantSizeMapping} from '../../model/themes/icon.theme';
import {NgClass} from '@angular/common';

@Component({
  selector: 'ui-icon',
  imports: [
    NgClass
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent extends AbstractUIComponent implements OnInit {
  name = input.required<string>();
  size = input<Size>("medium");
  color = input<Color | Status>("default");
  variant = input<IconVariant>('pi');
  isSpinner = input(false, {transform: booleanAttribute})

  override compiledClasses(): string {
    const builder = new StringBuilder();

    if (this.size()) {
      builder.append(iconVariantSizeMapping[this.variant()][this.size()])
        .append(" ");
    }
    if (this.color()) {
      builder.append(textColorAndStatusWithDensityMapping[this.color()]["d800"])
        .append(" ");
    }
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
