import {
  AfterViewInit,
  ApplicationRef,
  booleanAttribute,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Inject,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import {Position} from '../../../model/types';
import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
import {ObjectUtils} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {first} from 'rxjs';

type ElementID = string;

@Directive({
  selector: '[kaFloatingElement]',
  standalone: false,
  host: {
    ngSkipHydration: 'true'
  }
})
export class FloatingElementDirective implements AfterViewInit, OnInit, OnDestroy {

  referenceElement = input.required<HTMLElement | ElementID | ElementRef<any>>({alias: "referenceElement"});

  placement = input<Position>();
  action = input<'click' | 'hover'>('click');
  hasArrow = input(false, {transform: booleanAttribute});
  arrowClass = input<string>();

  private cleanUp!: () => void;

  private arrowElement!: HTMLElement;
  private containerElement!: HTMLElement;
  private finalReferenceElement!: HTMLElement;
  private doc = inject(DOCUMENT);

  constructor(
    private floatingElement: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private applicationRef: ApplicationRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
  }

  get getArrowElement() {
    return this.arrowElement;
  }

  ngOnDestroy(): void {
    this.cleanUp?.();
  }

  ngOnInit(): void {
    // if (!isPlatformBrowser(this.platformId)) return;
    // if (!isPlatformBrowser(this.platformId)) return;
    this.ngZone.runOutsideAngular(() => {
      this.applicationRef.isStable
        .pipe(first((stable) => stable))
        .subscribe(() => {
          this.containerElement = this.createContainer();
          this.finalRefElement();
          if (this.hasArrow()) {
            this.appendArrow();
          }
        });
    });
  }

  finalRefElement = () => {
    if (this.referenceElement() instanceof HTMLElement) {
      this.finalReferenceElement = this.referenceElement() as HTMLElement;
    } else if (this.referenceElement() instanceof ElementRef) {
      this.finalReferenceElement = (this.referenceElement() as ElementRef).nativeElement;
    } else if (typeof this.referenceElement() === "string") {
      this.finalReferenceElement = this.doc.getElementById(this.referenceElement() as ElementID)!;
    } else {
      throw Error("Unsupported referenceElement");
    }
  };

  createContainer = () => {
    // Crée un nouveau <div> qui servira de conteneur global
    const container = this.renderer.createElement('div');

    // Ajoute des classes ou des styles si besoin
    this.renderer.setStyle(container, 'position', 'absolute');
    this.renderer.addClass(container, 'ka-floating-container');

    // Ajoute le conteneur dans <body>
    this.renderer.appendChild(this.doc.body, container);
    // Déplace le floating element dans le nouveau container
    this.renderer.appendChild(container, this.floatingElement.nativeElement.cloneNode());

    this.renderer.addClass(this.floatingElement.nativeElement, 'ka-initial-element');
    this.renderer.addClass(container, 'hidden');
    return container;
  };

  appendArrow = () => {
    this.arrowElement = this.renderer.createElement("div");
    this.renderer.addClass(this.arrowElement, 'ka-floating-arrow');
    // console.log({color: this.floatingElement.nativeElement.});
    const classes = twMerge(
      (this.arrowClass() || "").split(" ")
        .filter(value => ObjectUtils.isNotNullAndNotUndefined(value)),
      "bg-blue-600"
    );
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(this.arrowElement, 'background-color', getComputedStyle(this.floatingElement.nativeElement).backgroundColor);
    }
    this.renderer.addClass(this.arrowElement, classes);
    this.renderer.appendChild(this.containerElement, this.arrowElement);
  };

  toggle = () => {
    const isOpen = !this.containerElement.classList.contains("hidden");
    this.containerElement.classList.toggle("hidden");
    if (!isOpen) {
      this.update();
    }
    this.changeDetector.detectChanges();
  };

  ngAfterViewInit(): void {
    const ref = this.finalReferenceElement!;
    if (ref) {
      this.renderer.listen(ref, "click", () => {
        if (this.action() === 'click') {
          this.toggle();
        }
      });
      this.renderer.listen(ref, "mouseenter", () => {
        if (this.action() === 'hover') {
          this.toggle();
        }
      });
    }
  }

  update = () => {
    if (!this.referenceElement()) return;
    if (this.cleanUp === undefined) {
      this.cleanUp = autoUpdate(
        this.finalReferenceElement,
        this.containerElement,
        () => {
          const middlewares = [
            flip(),
            shift({
              padding: 2
            }),
            offset(5),
            // autoPlacement({autoAlignment: true}),
          ];
          const arrowElement: HTMLElement = this.getArrowElement;
          if (this.hasArrow()) {
            middlewares.push(
              arrow({
                element: arrowElement,
              })
            )
          }

          computePosition(
            this.finalReferenceElement as HTMLElement, this.containerElement, {
              placement: this.placement(),
              strategy: "absolute",
              middleware: middlewares,
            }).then((position) => {
            Object.assign(this.containerElement.style, {
              left: `${position.x}px`,
              top: `${position.y}px`,
            });

            //accessing the data

            if (this.hasArrow()) {
              const arrowXY = position.middlewareData.arrow!;
              const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right',
              }[position.placement.split('-')[0]];

              console.log({arrowXY});

              Object.assign(arrowElement.style, {
                left: arrowXY.x != null ? `${arrowXY?.x}px` : '',
                top: arrowXY.y != null ? `${arrowXY?.y}px` : '',
                right: '',
                bottom: '',
                // [staticSide!]: '-4px',
              });

              this.containerElement.setAttribute('data-fe-placement', position.placement);
            }
          });
        }
      )
    }
  };

}
