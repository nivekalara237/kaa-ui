import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  inject,
  input,
  numberAttribute,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {ObjectUtils, RandomUtils, StringUtils} from 'co2m.js';
import {TriggerComponent} from './trigger/trigger.component';
import {Alignment, Position} from '../../../model/types';
import {
  arrow,
  autoPlacement,
  autoUpdate,
  computePosition,
  flip,
  inline,
  limitShift,
  offset,
  shift
} from '@floating-ui/dom';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'ka-floating-element',
  standalone: false,
  templateUrl: './floating-element.component.html',
  styleUrl: './floating-element.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class FloatingElementComponent extends AbstractUIComponent implements AfterViewInit, OnInit, OnDestroy {

  @ContentChild(TriggerComponent) triggerComponent!: TriggerComponent;

  id = input<string>();
  position = input<Position | `${Position}-${Alignment}`>('bottom');
  hasArrow = input(false, {transform: booleanAttribute});
  arrowClass = input<string>();
  offset = input(5, {transform: numberAttribute});
  inlined = input(true, {transform: booleanAttribute});
  autoAlignment = input(false, {transform: booleanAttribute});
  closeOutsideClick = input(false, {transform: booleanAttribute});

  @ViewChild("parentElement")
  parentElement!: ElementRef<HTMLDivElement>;
  protected __idAttr!: string;
  private cleanUpFloatingUi!: () => void;
  private __triggerElement!: HTMLElement;
  private __floatingContentElement!: HTMLElement;
  private platformId = inject(PLATFORM_ID);
  private isOpen = false;

  get open() {
    return this.isOpen;
  }

  set open(value) {
    this.isOpen = booleanAttribute(value);
  }

  override compiledClasses(): string {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.initElements();
  }

  ngOnDestroy(): void {
    this.cleanUpFloatingUi?.();
  }

  ngOnInit(): void {
    this.__idAttr = ObjectUtils.isNullOrUndefined(this.id()) ? `floating-element-${RandomUtils.secureChars(12)}` : this.id()!;
  }

  toggle = (forceClosed: boolean = false) => {
    if (forceClosed) {
      this.__floatingContentElement.classList.add("hidden");
      this.open = false;
    } else {
      const isOpen = !this.__floatingContentElement.classList.contains("hidden");
      this.__floatingContentElement.classList.toggle("hidden");
      if (!isOpen) {
        this.initFloatingUi();
      }
      this.open = !isOpen;
      this.changeDetector.detectChanges();
    }
  };

  @HostListener("document:click", ["$event"])
  onClick($event: Event) {
    const el = $event.target as HTMLElement;
    if (this.closeOutsideClick()) {
      if (this.open
        && !this.parentElement.nativeElement.contains(el)
      ) {
        this.toggle(true);
      }
    }
  }

  private initElements(): void {
    this.__triggerElement = this.triggerComponent.element;
    this.__floatingContentElement = this.parentElement.nativeElement.querySelector(".ka-floating-element-content")!;
  }

  private initFloatingUi(): void {
    if (this.cleanUpFloatingUi === undefined) {
      let arrowOffset = 0;
      const isRightOrLeft = StringUtils.startsWithAny(this.position(), "left", "right");
      const arrowElement: HTMLElement = this.__floatingContentElement.querySelector("#ka-floating-arrow")!;

      if (isPlatformBrowser(this.platformId) && this.hasArrow()) {
        if (isRightOrLeft) {
          arrowOffset = Number(new RegExp(/^(\d+(\.\d+)?)/).exec(getComputedStyle(arrowElement).width)?.at(1));
        } else {
          arrowOffset = Number(new RegExp(/^(\d+(\.\d+)?)/).exec(getComputedStyle(arrowElement).height)?.at(1));
        }

        console.log({
          bg: getComputedStyle(this.__floatingContentElement.querySelector("ui-fe-content > *")!).background,
          bgc: getComputedStyle(this.__floatingContentElement.querySelector("ui-fe-content > *")!).backgroundColor,
        })
      }

      this.cleanUpFloatingUi = autoUpdate(this.__triggerElement, this.__floatingContentElement, () => {
        const middlewares = [
          flip(),
          shift({
            padding: 10,
            // elementContext: "floating",
            limiter: limitShift({
              mainAxis: true, offset: ({rects, placement}) => {
                return ({mainAxis: 10, crossAxis: 10})
              },
            })
          }),
          offset((this.offset() ?? 0) + (this.hasArrow() ? arrowOffset : 0))
        ];

        if (this.inlined()) {
          middlewares.push(inline());
        }
        if (this.autoAlignment()) {
          middlewares.push(autoPlacement({autoAlignment: true}));
        }
        if (this.hasArrow()) {
          middlewares.push(arrow({element: arrowElement}));
        }

        computePosition(this.__triggerElement, this.__floatingContentElement, {
          placement: this.position(),
          strategy: "absolute",
          middleware: middlewares,
        }).then((position) => {
          Object.assign(this.__floatingContentElement.style, {
            left: `${position.x}px`,
            top: `${position.y}px`,
          });

          if (this.hasArrow()) {
            const arrowXY = position.middlewareData.arrow;
            const staticSide = {
              top: 'bottom',
              right: 'left',
              bottom: 'top',
              left: 'right',
            }[position.placement.split('-')[0]];

            Object.assign(arrowElement.style, {
              left: ObjectUtils.isNotNullAndNotUndefined(arrowXY?.x) ? `${arrowXY?.x}px` : '',
              top: ObjectUtils.isNotNullAndNotUndefined(arrowXY?.y) ? `${arrowXY?.y}px` : '',
              right: '',
              bottom: '',
              [staticSide!]: '-4px',
            });

            this.__floatingContentElement.setAttribute('data-fe-placement', position.placement);
          }
        });
      });
    }

  }
}
