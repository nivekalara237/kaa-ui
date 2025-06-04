import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[kaPopover]',
  standalone: false
})
export class KaPopoverDirective implements OnInit {
  @Input('popoverContent') content?: string | TemplateRef<any>;

  private popoverEl!: HTMLElement;

  constructor(
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
    
  }

  @HostListener("click")
  onClick() {
    this.createPopover();
  }

  private createPopover() {
    // Crée le wrapper
    this.popoverEl = this.renderer.createElement('div');
    this.renderer.addClass(this.popoverEl, 'popover-wrapper');

    if (typeof this.content === 'string') {
      const text = this.renderer.createText(this.content);
      this.renderer.appendChild(this.popoverEl, text);
    } else if (this.content instanceof TemplateRef) {
      const embeddedView = this.vcr.createEmbeddedView(this.content);
      embeddedView.rootNodes.forEach(node => {
        this.renderer.appendChild(this.popoverEl, node);
      });
    }

    // Ajoute la flèche
    const arrow = this.renderer.createElement('div');
    this.renderer.addClass(arrow, 'arrow');
    this.renderer.appendChild(this.popoverEl, arrow);

    // Ajoute le popover au DOM (tu peux ajuster pour l'afficher sur clic ou hover)
    this.renderer.appendChild(document.body, this.popoverEl);
  }
}
