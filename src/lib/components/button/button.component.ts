import {
  AfterContentInit,
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  OnInit,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {IconVariant, Position, RoundedSize, Size, Status} from "../../model/types";
import {AbstractUIComponent} from "../abstract.component";
import {StringBuilder, StringUtils} from "co2m.js";
import {
  buttonGhost,
  ButtonIconOnlySize,
  buttonOutlined,
  buttonRounded,
  ButtonSize,
  defaultButton,
  disabledButton
} from "../../model/themes/button.theme";
import {NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {twMerge} from 'tailwind-merge';
import {iconVariantSizeMapping} from '../../model/themes/icon.theme';

@Component({
  selector: 'ui-button',
  imports: [
    NgIf,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  providers: [
    {
      provide: AbstractUIComponent,
      useExisting: ButtonComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': ''
  }
})
export class ButtonComponent extends AbstractUIComponent implements OnInit, AfterContentInit, AfterViewInit {

  ngContentChild = viewChild.required<ElementRef<HTMLButtonElement>>('buttonElement')

  status = input<Status>("default");
  size = input<Size>("medium");
  outline = input(false, {transform: booleanAttribute});
  gradiant = input(false, {transform: booleanAttribute});
  rounded = input<RoundedSize>("small");
  buttonTagType = input<"submit" | "button" | "reset">("button");
  fullWidth = input(false, {transform: booleanAttribute});
  ghost = input(false, {transform: booleanAttribute});
  disabled = input(false, {transform: booleanAttribute});
  icon = input<string>();
  iconVariant = input<IconVariant>('pi');
  iconPosition = input<Position>('left');

  __activeIconGap = true;

  constructor(
    protected override changeDetector: ChangeDetectorRef
  ) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

  override compiledClasses(): string {
    let classes = new StringBuilder('transition-all duration-500 ');
    classes.append(ButtonSize[this.size()])
      .append(" ");

    if (this.disabled()) {
      classes.append(disabledButton).append(" ");
    } else {
      if (this.ghost()) {
        classes.append(buttonGhost[this.status()]).append(" ");
      } else if (this.outline()) {
        classes.append(buttonOutlined[<Exclude<Status, "soft">>this.status()!])
          .append(" ");
      } else {
        classes.append(defaultButton[this.status()]["coloration"])
          .append(" ");
      }

      if (this.gradiant()) {
        classes.append("");
      }
    }

    classes.append(buttonRounded[this.rounded()])
      .append(" ")

    if (this.fullWidth()) {
      classes.append("w-full ")
    }
    if (this.nativeClassName()) {
      classes.append(this.nativeClassName()!)
        .append(" ")
    }

    return classes.toString();
  }

  ngAfterViewInit(): void {
    if (StringUtils.size(this.ngContentChild().nativeElement.textContent!) === 0) {
      if (this.icon()) {
        this.__activeIconGap = false;
        this.elementClass = twMerge(this.elementClass, ButtonIconOnlySize[this.size()]);
        this.changeDetector.detectChanges();
      }
    }
  }

  ngAfterContentInit(): void {
  }

  getIconSize = () => iconVariantSizeMapping[this.iconVariant()][this.size()];
}
