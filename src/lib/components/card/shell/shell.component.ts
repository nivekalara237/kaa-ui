import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  OnInit
} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {Position, Size, Status} from '../../../model/types';
import {cardBorderedColor} from '../../../model/themes/card.theme';
import {CardTitleComponent} from '../title/title.component';
import {CardSubTitleComponent} from '../sub-title/sub-title.component';
import {CardBodyComponent} from '../body/body.component';
import {CardLinkComponent} from '../link/link.component';
import {CardFooterComponent} from '../footer/footer.component';

@Component({
  selector: 'ui-card',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  @ContentChild(CardTitleComponent)
  titleContent!: CardTitleComponent;
  @ContentChild(CardSubTitleComponent)
  subTitleContent!: CardSubTitleComponent;
  @ContentChild(CardBodyComponent)
  bodyContent!: CardBodyComponent;
  @ContentChild(CardLinkComponent)
  linkContent!: CardLinkComponent;
  @ContentChild(CardFooterComponent)
  footerContent!: CardFooterComponent;

  shadow = input<Size>();
  size = input<Size>();
  hoverable = input(false, {transform: booleanAttribute});
  // closable = input(false, {transform: booleanAttribute});
  skeleton = input(false, {transform: booleanAttribute});
  noPadding = input(false, {transform: booleanAttribute});
  footable = input(false, {transform: booleanAttribute});
  noTitle = input(false, {transform: booleanAttribute});
  bordered = input<Status>();
  backgroundImage = input<string>();

  withImage = input<string>();
  imageClass = input<string>();
  imagePosition = input<Exclude<Position, 'bottom'>>('top')

  __imageClass!: string;

  compiledClasses(): string {
    const builder = new StringBuilder("p-5 flex flex-col bg-white shadow border border-solid border-gray-200 rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 transition-all duration-500 ");


    this.__imageClass = this.imageClass() ?? "";

    if (this.withImage()) {
      if (this.imagePosition() === 'top') {
        this.__imageClass = twMerge('rounded-se-xl rounded-ss-xl', this.__imageClass);
        builder.append("rounded-se-none rounded-ss-none").append(" ");
      } else if (this.imagePosition() === 'left') {
        this.__imageClass = twMerge('rounded-ss-xl rounded-bl-xl', this.__imageClass);
        builder.append("rounded-ss-none rounded-bl-none").append(" ");
      } else if (this.imagePosition() === 'right') {
        this.__imageClass = twMerge('rounded-se-xl rounded-br-xl', this.__imageClass);
        builder.append("rounded-se-none rounded-br-none").append(" ");
      } else {
      }
    }

    if (this.hoverable()) {
      const size = this.shadow() ?? 'tiny';
      const hoverMap: Record<Size, string> = {
        tiny: 'hover:shadow-lg',
        small: 'hover:shadow-xl',
        medium: 'hover:shadow-2xl',
        large: 'hover:shadow-2xl',
        giant: 'hover:shadow-2xl'
      }
      builder.append(hoverMap[size]).append(" ");
    }

    if (this.bordered() && (!this.withImage() || this.withImage() && this.imagePosition() !== "top")) {
      builder.append(cardBorderedColor[this.bordered()!]).append(' ');
    }

    if (this.shadow()) {
      const shadowMap: Record<Size, string> = {
        tiny: 'shadow-sm',
        small: 'shadow-md',
        medium: 'shadow-lg',
        large: 'shadow-xl',
        giant: 'shadow-2xl'
      };
      builder.append(shadowMap[this.shadow()!]).append(" ");
      this.__imageClass = twMerge(shadowMap[this.shadow()!], this.__imageClass);
    }

    if (this.noPadding()) {
      builder.append("p-0").append(" ");
    }

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = twMerge(this.compiledClasses(), this.noPadding() ? 'p-0' : '');
  }

  ngAfterViewInit(): void {
    if (this.skeleton()) {
      this.handlerChildrenSkeleton();
    }
  }

  handlerChildrenSkeleton = () => {
    if (this.titleContent) {
      this.titleContent.skeleton = true;
    }
    if (this.subTitleContent) {
      this.subTitleContent.skeleton = true;
    }
    if (this.linkContent) {
      this.linkContent.skeleton = true;
    }
    if (this.bodyContent) {
      this.bodyContent.skeleton = true;
    }
    if (this.footerContent) {
      this.footerContent.skeleton = true;
    }
  };
}
