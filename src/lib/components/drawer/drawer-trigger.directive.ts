import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  NgZone,
  OnInit,
  output,
  Renderer2
} from '@angular/core';
import {DrawerComponent} from './drawer.component';
import {CardinalDirection} from '../../model/types';

@Directive({
  selector: '[kaDrawerTrigger]',
  standalone: false
})
export class DrawerTriggerDirective implements OnInit, AfterViewInit {

  targetDrawer = input.required<DrawerComponent>({alias: 'target-drawer'});
  position = input<CardinalDirection>();
  action = input<'click' | 'hover'>('click');

  drawerToggled = output<boolean>({alias: "onDrawerToggle"});

  private el = inject(ElementRef);

  constructor(
    private ngZone: NgZone,
    private render2: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    const drawer = this.targetDrawer();
    this.ngZone.runOutsideAngular(() => {
      this.render2.setAttribute(this.el.nativeElement, "aria-expanded", "false");
      this.render2.setAttribute(this.el.nativeElement, "aria-haspopup", "dialog");
      this.render2.setAttribute(this.el.nativeElement, "aria-controls", drawer.idAttr);
    });

    drawer.closed.subscribe(value => {
      this.render2.setAttribute(this.el.nativeElement, "aria-expanded", `${!value}`);
    });
  }

  ngOnInit(): void {
    this.drawerToggled.subscribe(value => {
      this.render2.setAttribute(this.el.nativeElement, "aria-expanded", `${value}`);
    });
  }

  @HostListener("click", ["$event"])
  click($event: Event) {
    if (this.action() === 'click') {
      $event.stopPropagation();
      const drawer = this.targetDrawer();
      if (this.position()) {
        drawer.position = this.position()!;
        drawer.markChange();
      }
      drawer.toggle();
      this.drawerToggled.emit(drawer.isOpen);
    }
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    if (this.action() === "hover") {
      const drawer = this.targetDrawer();
      if (this.position()) {
        drawer.position = this.position()!;
        drawer.markChange();
      }
      drawer.isOpen = true;
      this.drawerToggled.emit(true);
    }
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    if (this.action() === "hover") {
      const drawer = this.targetDrawer();
      if (this.position()) {
        drawer.position = this.position()!;
        drawer.markChange();
      }
      drawer.isOpen = false;
      this.drawerToggled.emit(false);
    }
  }

}
