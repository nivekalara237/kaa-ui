import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
  HostListener,
  inject,
  Input,
  input,
  numberAttribute,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {StepperStatus, StepperStepType} from '../../../model/types';
import {StepDescriptionSlotDirective} from '../slots/step-description-slot.directive';
import {DomSanitizer} from '@angular/platform-browser';
import {StepperComponent} from '../stepper.component';
import {StepIconSlotDirective} from '../slots/step-icon-slot.directive';
import {StepContentSlotDirective} from '../slots/step-content-slot.directive';

@Component({
  selector: 'ka-step, ui-step',
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'step group flex-1'
  }
})
export class StepComponent extends AbstractUIComponent implements OnInit, AfterViewInit {
  domSanitizer = inject(DomSanitizer);
  title = input<string>();
  description = input<string>();
  type = input<StepperStepType>('numbered');
  stepStatus = input<StepperStatus>('none', {alias: 'status'});
  indicatorTemplateRef = input<TemplateRef<any>>(undefined, {alias: 'templateRef'});
  @ContentChild(StepDescriptionSlotDirective) descriptionSlot!: StepDescriptionSlotDirective;
  @ContentChild(StepIconSlotDirective) iconSlot!: StepIconSlotDirective;
  @ContentChild(StepContentSlotDirective) contentSlot!: StepContentSlotDirective;
  _description: any;
  @Input()
  validationFn?: () => boolean;
  @ViewChild("content", {static: true}) protected templateRef!: TemplateRef<any>
  protected _isVertical!: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    @Optional() @Host() public stepper: StepperComponent,
    private el: ElementRef<HTMLElement>
  ) {
    super(cd);
  }

  get iconContent() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.iconSlot?.html ?? StepIconSlotDirective.defaultIcon());
  }

  get contentHtml() {
    return this.contentSlot ? this.domSanitizer.bypassSecurityTrustHtml(this.contentSlot.element?.outerHTML) : undefined;
  }

  get contentTemplateRef() {
    return this.contentSlot?.effectiveTemplateRef;
  }

  private _status!: StepperStatus;

  get status(): StepperStatus {
    return this._status ?? this.stepStatus();
  }

  set status(value: StepperStatus) {
    this._status = value;
  }

  get template() {
    return this.templateRef;
  }

  private _index!: number;

  get index() {
    return this._index;
  }

  set index(value: number) {
    this._index = numberAttribute(value);
  }

  private _active!: boolean;

  get active() {
    return this._active;
  }

  set active(value: boolean) {
    this._active = booleanAttribute(value);
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    const fn = () => {
      if (this.descriptionSlot?.element) {
        this._description = this.domSanitizer.bypassSecurityTrustHtml(this.descriptionSlot.element.outerHTML);
      } else {
        this._description = this.description();
      }
      this._isVertical = this.stepper?.orientation() === 'vertical';
      if (this._isVertical) {
        this.el.nativeElement.classList.add(...("my-2 last:mb-0 first:mt-0".split(" ")));
      } else {
        this.el.nativeElement.classList.add(...("mx-2 last:me-0 first:ms-0".split(" ")));
      }
    };
    setTimeout(fn, 0);
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

  @HostListener("click")
  onClick() {
    if (!this.stepper || !this.stepper.selectable()) return;

    const steps = this.stepper.stepComponents.toArray();
    const targetIndex = steps.indexOf(this);

    // Vérifie la validité de tous les steps AVANT celui-ci
    for (let i = 0; i < targetIndex; i++) {
      const step = steps[i];
      const isValid = step.validationFn?.() ?? true;
      if (!isValid) {
        step.status = "error";
        return; // empêche la navigation
      }
    }

    // Si déjà sur ce step, rien à faire
    if (this.stepper.currentIndex === targetIndex) {
      return;
    }

    // On navigue vers le step cliqué
    this.stepper.flow.select(targetIndex); // Assure-toi que cette méthode existe
    this.stepper.finished$.next(false);
  }
}
