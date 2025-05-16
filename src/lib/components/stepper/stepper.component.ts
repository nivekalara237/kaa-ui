import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EmbeddedViewRef,
  input,
  numberAttribute,
  OnInit,
  output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {ObjectUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {Orientation, Size} from '../../model/types';
import {StepComponent} from './step/step.component';
import {StepperOutletDirective} from './stepper-outlet.directive';
import {StepperFinalContentSlotDirective} from './slots/stepper-final-content-slot.directive';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'ka-stepper, ui-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css', './stapper.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  active = input(0, {transform: numberAttribute});
  size = input<Size>();
  orientation = input<Orientation>('horizontal');
  selectable = input(true, {transform: booleanAttribute});
  actionable = input(false, {transform: booleanAttribute});
  outlet = input<StepperOutletDirective>();
  stepChange = output<number>();
  @ContentChildren(StepComponent)
  stepComponents!: QueryList<StepComponent>;
  @ContentChild(StepperFinalContentSlotDirective) finaleStepSlot!: StepperFinalContentSlotDirective;

  steps: Array<StepComponent> = [];

  currentIndex = -1;
  stepLength = 0;

  finished$ = new BehaviorSubject(false);
  private viewStepCache = new Map<number, EmbeddedViewRef<any>>;

  get isVertical() {
    return this.orientation() === "vertical";
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    this.currentIndex = this.active();
    this.init();
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

  handlerFlow(flow: 'next' | 'prev' | 'finished' | 'reset') {
    const currentStep = this.stepComponents.find(v => v.index - 1 === this.currentIndex)!;
    if (flow === 'next') {
      const isValid = currentStep?.validationFn?.() ?? true;
      if (isValid) {
        this.flow.next();
        this.finished$.next(false);
      } else {
        currentStep.status = 'error';
      }
    } else if (flow === 'prev') {
      this.flow.previous();
      this.finished$.next(false);
    } else if (flow === 'reset') {
      this.flow.select(0);
      this.finished$.next(false);
    } else if (flow === 'finished') {
      this.finished$.next(true);
      this.stepComponents.forEach(step => {
        step.status = "completed";
        step.active = false;
      });
    }
  }

  private updateSteps = () => {
    this.stepChange.emit(this.currentIndex);
    if (this.outlet()) {
      // this.outlet()?.viewContainerRef?.clear();
    }
    this.steps = this.stepComponents.map((step, index) => {
      this.setStepItemStatusAndActiveAttr(step, index);
      if (this.currentIndex === index && this.outlet()) {

        if (!this.viewStepCache.has(index) && step.contentTemplateRef) {
          const view = this.outlet()?.viewContainerRef?.createEmbeddedView(step.contentTemplateRef);
          this.viewStepCache.set(index, view!);
        } else {
          this.outlet()?.viewContainerRef?.detach();
          this.outlet()?.viewContainerRef?.insert(this.viewStepCache.get(index)!);
        }

        /*if (step.contentTemplateRef) {
          this.outlet()?.viewContainerRef?.clear();
          this.outlet()?.viewContainerRef?.createEmbeddedView(step.contentTemplateRef);
        }*/
      }
      return step;
    });
    this.changeDetector.markForCheck();
  };

  flow = {
    next: () => {
      if (ObjectUtils.isNullOrUndefined(this.currentIndex) || this.currentIndex === -1) {
        this.currentIndex = 0;
      } else if (this.currentIndex === this.stepLength - 1) {
        this.currentIndex = -1;
      }// else if (this.currentIndex ===)
      else {
        this.currentIndex++;
      }
      this.updateSteps();
    },
    previous: () => {
      // console.log({curr: this.currentIndex});
      if (ObjectUtils.isNullOrUndefined(this.currentIndex) || this.currentIndex === -1) {
        this.currentIndex = this.stepLength - 1;
      } else {
        this.currentIndex--;
      }
      this.updateSteps();
    },
    select: (index: number) => {
      this.currentIndex = index;
      this.updateSteps();
    },
    reset: () => {
      this.currentIndex = -1;
      this.updateSteps();
    }
  };

  private setStepItemStatusAndActiveAttr(step: StepComponent, index: number) {
    step.active = this.currentIndex === index;
    if (index < this.currentIndex) {
      step.status = "processed";
    } else {
      step.status = "none";
    }
    if (this.currentIndex === -1 || ObjectUtils.isNullOrUndefined(this.currentIndex)) {
      step.status = "none";
    }
  }

  private init() {
    if (this.stepComponents && this.stepComponents.length > 0) {
      this.stepLength = this.stepComponents.length;
      const handler = () => this.stepComponents.forEach((step, index) => {
        step.index = (index + 1);
        // step.stepper = this;
        this.setStepItemStatusAndActiveAttr(step, index);
        this.steps.push(step);
      });
      setTimeout(handler, 0);
      this.changeDetector.detectChanges();
    }
  }
}
