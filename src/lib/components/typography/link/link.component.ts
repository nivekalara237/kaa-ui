import {booleanAttribute, ChangeDetectorRef, Component, input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {link} from '../../../model/themes/typography.theme';

@Component({
  selector: 'ui-link',
  imports: [
    NgIf,
    RouterLink,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent extends AbstractUIComponent implements OnInit {

  external = input(false, {transform: booleanAttribute});
  isRoute = input(false, {transform: booleanAttribute});
  url = input.required<string>();

  constructor(
    protected override changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    super(changeDetector);
  }

  compiledClasses(): string {
    return link;
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
