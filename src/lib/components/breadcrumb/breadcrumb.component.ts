import {booleanAttribute, Component, Input, numberAttribute, OnInit, TemplateRef} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {getIconObject, isIconObject, MenuItem} from '../../model/domain/menu-item.domain';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {IconComponent} from '../icon/icon.component';

@Component({
  selector: 'ka-breadcrumb, ui-breadcrumb',
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    RouterLinkActive,
    IconComponent
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  host: {},
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(0.95)'}),
        animate('200ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({opacity: 0}))
      ])
    ])
  ]
})
export class BreadcrumbComponent extends AbstractUIComponent implements OnInit {

  protected readonly isIconObject = isIconObject;
  protected readonly getIconObject = getIconObject;
  private expanded = false;

  private _multipage = false;

  @Input({transform: booleanAttribute})
  get multipage(): boolean {
    return this._multipage;
  }

  set multipage(value: boolean) {
    this._multipage = value;
  }

  private _maxVisible = 4;

  @Input({transform: numberAttribute})
  get maxVisible() {
    return this._maxVisible;
  }

  set maxVisible(value: number) {
    this._maxVisible = numberAttribute(value);
  }

  private _items!: MenuItem[];

  @Input({required: true})
  get items(): MenuItem[] {
    return this._items;
  }

  set items(value: MenuItem[]) {
    if (!value) {
      throw new Error('Items cannot be null or undefined');
    }
    this._items = value;
  }

  get visibleItems(): (MenuItem | 'ellipsis')[] {
    const total = this.items.length;

    if (this.expanded || total <= this.maxVisible) {
      return this.items;
    }

    return [
      this.items[0],
      'ellipsis',
      ...this.items.slice(-2)
    ];
  }

  private _separator: string | TemplateRef<any> = '/';

  @Input()
  get separator(): string | TemplateRef<any> {
    return this._separator;
  }

  set separator(value: string | TemplateRef<any>) {
    this._separator = value;
  }

  get isTemplateSeparator() {
    return this.separator instanceof TemplateRef;
  }

  /*@HostBinding("class")
  hostClass() {
    return [
      // this.nativeClassName()
    ];
  }*/

  get separatorAsTemplate() {
    return this.separator as TemplateRef<any>;
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();

    return twMerge(builder.segments());
  }

  ngOnInit(): void {
  }

  toggleExpand(): void {
    this.expanded = true;
  }

  execCommand = (item: MenuItem) => {
    if (item.command) {
      item.command();
    }
  }
}
