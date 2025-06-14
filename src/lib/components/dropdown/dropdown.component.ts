import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  OnInit,
  output,
  TemplateRef,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {BooleanUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {DropdownPlacement, DropdownTriggerType} from '../../model/types';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'ka-dropdown, ui-dropdown',
  standalone: false,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: AbstractUIComponent,
      useExisting: DropdownComponent
    }
  ]
})
export class DropdownComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  open = input(false, {alias: "isOpen", transform: booleanAttribute});
  label = input<string>("Dropdown");
  button = input<TemplateRef<any> | null>(null);
  toggle = viewChild<ElementRef>("toggle");
  target = viewChild<ElementRef>("target");
  placement = input<DropdownPlacement>('bottom');
  trigger = input<DropdownTriggerType>("click");
  autoAdjustment = input(false, {transform: booleanAttribute})

  close = output<'CLOSE' | 'OPEN'>({alias: "onClose"})

  toggleButtonTriggerHandleTimer!: any;
  protected htmlContent = viewChild.required<HTMLDivElement>("htmlDivElement");
  protected isOpen$ = new BehaviorSubject(false);

  get nativeElement() {
    return this.htmlContent();
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    this.isOpen$.subscribe(value => this.close.emit(value ? 'OPEN' : 'CLOSE'));
  }

  ngAfterViewInit(): void {
  }

  toggleHandler = (forceClose?: boolean) => {
    const targetHtml: HTMLElement = this.target()?.nativeElement;
    if (BooleanUtils.isFalse(forceClose)) {
      targetHtml.classList.toggle("hidden");
      this.isOpen$.next(this.isOpen());
    } else {
      targetHtml.classList.remove("block", "flex", "grid", "inline", "inline-block", "inline-flex", "flex-col", "flex-row");
      targetHtml.classList.add("hidden");
      this.isOpen$.next(this.isOpen());
    }
  }

  @HostListener("document:click", ["$event"])
  clickOutside = ($event: any) => {
    if (this.trigger() !== "click") {
      return;
    }
    const triggerEl: HTMLElement = this.toggle()?.nativeElement;
    const clickedEl = $event.target as HTMLElement;

    const triggerClicked = triggerEl.contains(clickedEl)
      || triggerEl.isEqualNode(clickedEl);

    if (!triggerClicked) {
      this.toggleHandler(true);
    }
  }

  onHover(enter: boolean) {
    if (this.trigger() === "hover") {
      clearTimeout(this.toggleButtonTriggerHandleTimer);
      if (enter) {
        // console.log("Hover", enter);
      } else {
        //this.toggleHandler(true);
      }
      this.toggleHandler();
    }
  }

  protected isOpen = () => !(<HTMLElement>this.target()?.nativeElement).classList.contains("hidden");

  protected isTranslableX = () => (["left", "right"] as DropdownPlacement[]).includes(this.placement());

  protected isDropup = () => (["top", "top-left", "top-right"] as DropdownPlacement[]).includes(this.placement());

  protected handleButtonCloser = ($event: MouseEvent) => {
    clearTimeout(this.toggleButtonTriggerHandleTimer);
  };
  protected leaveButtonOrMenu = ($event: MouseEvent) => {
    if (this.trigger() !== "hover") {
      return;
    }
    const menuElt = $event.currentTarget as HTMLElement;
    clearTimeout(this.toggleButtonTriggerHandleTimer);
    this.toggleButtonTriggerHandleTimer = setTimeout(() => {
      if (!menuElt || !menuElt.closest(".dropdown") || !menuElt.closest("#toggleButton")) {
        this.toggleHandler(true);
        // console.log("Leave from button");
      }
    }, 100);
  };
}
