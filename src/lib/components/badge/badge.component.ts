import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  ViewChild
} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {Color, RoundedSize, Size, Status} from '../../model/types';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {
  badgeBorderSizeMapping,
  badgeBorderStatusMapping,
  badgeCloseableButtonHoverColorMapping,
  badgeCloseableButtonSizeMapping,
  badgeRoundedSizeMapping,
  badgeSizeMapping,
  badgeStatusMapping
} from '../../model/themes/badge.theme';
import {NgClass, NgIf} from '@angular/common';

type BadgeSize = Exclude<Size, 'giant'>;

@Component({
  selector: 'ui-badge, ka-badge',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent extends AbstractUIComponent implements OnInit {

  status = input<Status>();
  color = input<Color>();
  size = input<BadgeSize>('small');
  rounded = input<RoundedSize>('small');
  border = input(false, {transform: booleanAttribute});
  closable = input(false, {transform: booleanAttribute});
  close = output<boolean>({})
  @ViewChild("badge")
  protected badgeElement!: ElementRef<HTMLSpanElement>;
  protected _closeableBtnClass!: string;
  protected _closeableBtnSizeClass!: string;

  compiledClasses(): string {
    const b = new StringBuilder();
    const c = new StringBuilder();

    if (this.color()) {
      b.append(badgeStatusMapping[this.color()!]).append(" ");
      c.append(badgeCloseableButtonHoverColorMapping[this.color()!]).append(" ");
    }
    if (this.status()) {
      b.append(badgeStatusMapping[this.status()!]).append(" ");
      c.append(badgeCloseableButtonHoverColorMapping[this.status()!]).append(" ");
    }

    b.append(badgeSizeMapping[this.size()]).append(" ");
    this._closeableBtnSizeClass = badgeCloseableButtonSizeMapping[this.size()];
    b.append(badgeRoundedSizeMapping[this.rounded()]).append(" ");

    if (this.border()) {
      if (this.color()) {
        b.append(badgeBorderStatusMapping[this.color()!])
          .append(" ").append(badgeBorderSizeMapping[this.size()])
          .append(" ");
      }
      if (this.status()) {
        b.append(badgeBorderStatusMapping[this.status()!])
          .append(" ")
          .append(badgeBorderSizeMapping[this.size()])
          .append(" ");
      }
    }

    if (this.nativeClassName()) {
      b.append(this.nativeClassName()).append(" ");
    }
    this._closeableBtnClass = twMerge(c.toString().split(" "));
    return twMerge(b.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

  handlerClose() {
    this.badgeElement.nativeElement.parentElement!.remove();
    this.close.emit(true);
  }
}
