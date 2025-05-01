import {Component, Input} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'safe-html-renderer',
  template: `
    <div [innerHTML]="html"></div>`,
})
export class SafeHtmlRendererComponent {
  @Input() html!: SafeHtml;
}
