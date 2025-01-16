import {booleanAttribute, Component, input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {AvatarShape, Color, Size, Status} from '../../model/types';
import {ringColorAndStatusWithDensityMapping} from '../../model/themes/common.theme';
import {
  avatarIndicatorColorMapping,
  avatarIndicatorSizeMapping,
  avatarSizeMapping
} from '../../model/themes/avatar.theme';

@Component({
  selector: 'ui-avatar',
  imports: [
    NgClass,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  providers: [{
    provide: AbstractUIComponent,
    useExisting: AvatarComponent
  }]
})
export class AvatarComponent extends AbstractUIComponent implements OnInit {

  circle = input(false, {transform: booleanAttribute});
  square = input(false, {transform: booleanAttribute});
  imageUrl = input.required<string>();
  alt = input<string>();
  shape = input<AvatarShape>();
  border = input<Status | Color>();
  dotIndicator = input<Status | Color>();
  indicationPosition = input<'top' | 'bottom'>('top');
  size = input<Size>('small');

  // User
  name = input<string>();
  title = input<string>();

  _dotIndicatorClass!: string;

  get getShape(): AvatarShape {
    if (this.shape() === undefined) {
      const sqr: AvatarShape | undefined = this.square() ? "square" : undefined;
      const cl: AvatarShape | undefined = this.circle() ? "circle" : undefined;
      return sqr || (cl || 'rounded');
    } else {
      return this.shape()!;
    }
  }

  compiledClasses(): string {
    const builder = new StringBuilder();

    if (this.border()) {
      builder.append("ring-2 p-1").append(" ")
        .append(ringColorAndStatusWithDensityMapping[this.border()!]['d300'])
        .append(" ");
    }

    builder.append(avatarSizeMapping[this.size()]).append(" ");

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }

    this.compiledDotIndicatorClass();
    return twMerge(builder.toString().split(" "));
  }

  compiledDotIndicatorClass = () => {
    const dotind = new StringBuilder();
    if (this.dotIndicator()) {
      const shape = this.getShape === "circle" ? this.getShape : 'roundedOrSquare'
      dotind.append(avatarIndicatorSizeMapping[shape][this.indicationPosition()][this.size()])
        .append(" ");
      dotind.append(avatarIndicatorColorMapping[this.dotIndicator()!])
        .append(" ");
      // dotind.append(avatarIndicatorRepositionBasedShapeMapping[this.size()!]).append(" ");
    }
    this._dotIndicatorClass = twMerge(dotind.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
