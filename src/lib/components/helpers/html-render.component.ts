import {Component, ElementRef, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'html-renderer',
  template: '',
})
export class HtmlRendererComponent {
  private container: ElementRef | null = null;
  private safeHtml: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer) {
  }

  @Input('outlet') set outlet(container: ElementRef | null) {
    if (container && this.safeHtml) {
      this.renderHtml(container, this.safeHtml);
    }
    this.container = container;
  }

  @Input() set content(html: string) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    if (this.container) {
      this.renderHtml(this.container, this.safeHtml);
    }
  }

  private renderHtml(container: ElementRef, html: SafeHtml) {
    container.nativeElement.innerHTML = html as string;
  }
}
