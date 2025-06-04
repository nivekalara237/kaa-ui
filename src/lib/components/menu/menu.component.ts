import {
  AfterViewInit,
  booleanAttribute,
  Component,
  ContentChild,
  Input,
  OnInit,
  output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {ObjectUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {getIconObject, isIconObject, MenuItem} from '../../model/domain/menu-item.domain';
import {MenuItemSlotDirective} from './slots/menu-item-slot.directive';
import {Orientation} from '../../model/types';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {MenuHeaderSlotDirective} from './slots/menu-header-slot.directive';
import {MenuFooterSlotDirective} from './slots/menu-footer-slot.directive';

type MenuItemWrapper = {
  item: MenuItem,
  shouldSubmenuRender: boolean
}

@Component({
  selector: 'ka-menu, ui-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: false,

  animations: [
    trigger("collapse", [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        overflow: 'hidden'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class MenuComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  @ContentChild("item", {read: TemplateRef}) itemTemplate!: TemplateRef<any>;
  @ContentChild("header", {read: TemplateRef}) headerTemplate!: TemplateRef<any>;
  @ContentChild("footer", {read: TemplateRef}) footerTemplate!: TemplateRef<any>;
  @ContentChild(MenuItemSlotDirective) itemSlot!: MenuItemSlotDirective;
  @ContentChild(MenuHeaderSlotDirective) headerSlot!: MenuHeaderSlotDirective;
  @ContentChild(MenuFooterSlotDirective) footerSlot!: MenuFooterSlotDirective;

  selected = output<MenuItem>();
  collapsed = output<any>();

  protected readonly isIconObject = isIconObject;
  protected readonly getIconObject = getIconObject;
  protected _itemTemplate!: TemplateRef<any>;
  protected _headerTemplate!: TemplateRef<any>;
  protected _footerTemplate!: TemplateRef<any>;
  protected _itemsWrapper: MenuItemWrapper[] = [];

  private _items: MenuItem[] = [];

  @Input()
  get items() {
    return this._items;
  }

  set items(value: MenuItem[]) {
    this._items = value || [];
  }

  private _dropped = false;

  get dropped() {
    return this._dropped;
  }

  set dropped(value: boolean) {
    this._dropped = booleanAttribute(value);
  }

  private _borderless = false;

  @Input({transform: booleanAttribute})
  get borderless() {
    return this._borderless;
  }

  set borderless(value: boolean) {
    this._borderless = booleanAttribute(value);
  }

  private _orientation: Orientation = "vertical";

  @Input()
  get orientation() {
    return this._orientation;
  }

  set orientation(value: Orientation) {
    this._orientation = ObjectUtils.getIfNull<Orientation>(value, 'vertical');
  }

  override compiledClasses(): string {
    const builder = new StringBuilder();
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    this._itemsWrapper = this.items.map(item => ({
      item,
      shouldSubmenuRender: !!item.expanded
    }));
    this.initSlotTpl();
  }

  initSlotTpl = () => {
    if (this.itemTemplate) {
      this._itemTemplate = this.itemTemplate;
    } else if (this.itemSlot && this.itemSlot.template) {
      this._itemTemplate = this.itemSlot.template;
    }

    if (this.headerTemplate) {
      this._headerTemplate = this.headerTemplate;
    } else if (this.headerSlot && this.headerSlot.template) {
      this._headerTemplate = this.headerSlot.template;
    }

    if (this.footerTemplate) {
      this._footerTemplate = this.footerTemplate;
    } else if (this.footerSlot && this.footerSlot.template) {
      this._footerTemplate = this.footerSlot.template;
    }

    this.changeDetector.detectChanges();
  };

  ngOnInit(): void {
    console.log({itemOnInit: this.itemTemplate});
  }

  onItemSelected(wrapper: MenuItemWrapper, el: HTMLElement, index: number, submenus: HTMLDivElement, target: any) {
    if (target === el || submenus.contains(target)) {
      return;
    }

    this.selected.emit(wrapper.item);

    if (wrapper.item.command) {
      wrapper.item.command(wrapper.item);
    }
    if (!wrapper.item.disabled && wrapper.item.children) {
      const chevron = el.querySelector(".ka-menu-item-chevron")!;
      const state = chevron.getAttribute("data-clicked-state");
      if (state === "clicked") {
        chevron.classList.remove("hidden");
        chevron.setAttribute("data-clicked-state", "unclicked");
      } else {
        chevron.classList.add("clicked");
        chevron.setAttribute("data-clicked-state", "clicked");
      }
      wrapper.item.expanded = !wrapper.item.expanded;
      if (wrapper.item.expanded) {
        wrapper.shouldSubmenuRender = true;
      }

      this.collapsed.emit({
        item: wrapper.item,
        state: wrapper.item.expanded ? 'EXPANDED' : 'COLLAPSED'
      });
    }
  }

  onCollapseDone($event: AnimationEvent, item: MenuItemWrapper) {
    if ($event.toState === "collapsed") {
      item.shouldSubmenuRender = false;
    }
  }
}
