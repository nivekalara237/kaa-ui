import {
  AfterViewInit,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Host,
  inject,
  Optional,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {StepComponent} from '../step/step.component';

@Directive({
  selector: '[kaStepContent]',
  standalone: false
})
export class StepContentSlotDirective implements AfterViewInit {

  private el = inject(ElementRef);

  private embeddedViewRef: EmbeddedViewRef<any> | null = null;

  // private templateRef = inject(TemplateRef<any>);

  constructor(
    @Optional() @Host() public step: StepComponent,
    @Optional() private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {
    if (!this.step) {
      throw new Error('The `kaStepContent` directive must be used inside a <ka-step>/<ui-step> component.');
    }
  }

  get element() {
    return this.el.nativeElement as HTMLElement;
  }

  get template() {
    return this.templateRef;
  }

  get effectiveTemplateRef(): TemplateRef<any> {
    // Si on a un vrai <ng-template>, on retourne direct
    if (this.templateRef) {
      return this.templateRef;
    }

    // Sinon, on crée un faux TemplateRef en englobant l'élément
    const virtualTemplate = {
      createEmbeddedView: (context: any) => {
        // Crée un view en clonant l'élément
        return this.viewContainerRef.createEmbeddedView({
          elementRef: this.viewContainerRef.element.nativeElement,
        } as any);
      }
    } as TemplateRef<any>;

    return virtualTemplate;
  }

  ngAfterViewInit() {
  }
}
