import {
  AfterViewInit,
  booleanAttribute,
  Component,
  ContentChild,
  HostListener,
  inject,
  input,
  Input,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {RandomUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {CardinalDirection, Size} from '../../model/types';
import {DOCUMENT} from '@angular/common';
import {DrawerHeaderDirective} from './slots/header.directive';
import {DrawerHeadlessDirective} from './slots/headless.directive';
import {DrawerFooterDirective} from './slots/footer.directive';

@Component({
  selector: 'ka-drawer, ui-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  standalone: false
})
export class DrawerComponent extends AbstractUIComponent implements OnInit, AfterViewInit, OnDestroy {

  size = input<Exclude<Size, 'giant' | 'tiny'> | 'full'>("medium");
  width = input<`${number}px` | `${number}rem` | `${number}%`>();
  headerText = input<string>(undefined, {alias: 'header'});
  hasBackdrop = input(true, {transform: booleanAttribute});
  closeOnBackdropClick = input(true, {transform: booleanAttribute});
  @ContentChild(DrawerHeaderDirective) headerSlot!: DrawerHeaderDirective;
  @ContentChild(DrawerHeadlessDirective) headlessSlot!: DrawerHeadlessDirective;
  @ContentChild(DrawerFooterDirective) footerSlot!: DrawerFooterDirective;
  closed = output<boolean>();
  isInitialized = false;
  isVisible = false;
  isHeadless = false;
  hasFooterSlot = false;
  idAttr!: string;
  protected _header2Display!: string | TemplateRef<any>;
  private doc = inject(DOCUMENT);

  _noHeader!: boolean

  @Input({transform: booleanAttribute})
  get noHeader(): boolean {
    return this._noHeader;
  }

  set noHeader(value: boolean) {
    this._noHeader = value;
  }

  _closeable!: boolean

  @Input({transform: booleanAttribute})
  get closeable(): boolean {
    return this._closeable;
  }

  set closeable(value: boolean) {
    this._closeable = value;
  }

  _isOpen = false;

  @Input({alias: 'open', transform: booleanAttribute})
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    /*if (booleanAttribute(value)) {
      this.isVisible = true;
      setTimeout(() => (this._isOpen = true), 10); // petit délai pour laisser le DOM rendre
    } else {
      this._isOpen = false;
      // laisser l'animation se jouer avant de retirer le composant
      setTimeout(() => (this.isVisible = false), 200);
    }*/
    this.isVisible = booleanAttribute(value);
    this._isOpen = booleanAttribute(value);
  }

  private _position: CardinalDirection = "left";

  @Input()
  get position() {
    return this._position;
  }

  set position(value: CardinalDirection) {
    this._position = value;
  }

  get isVertical() {
    return this.position === 'left' || this.position === 'right';
  }

  get headerAsTemplate() {
    return typeof this._header2Display === "string" ? undefined : this._header2Display as TemplateRef<any>;
  }

  compiledClasses(): string {
    const builder = new StringBuilder();
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
    if (this.headerSlot?.template) {
      this._header2Display = this.headerSlot.template;
    } else {
      this._header2Display = this.headerText() ?? "";
    }

    if (this.headlessSlot?.template) {
      this.isHeadless = true;
    }

    if (this.footerSlot?.template) {
      this.hasFooterSlot = true;
    }
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
    // console.log({pos: this.position});
    this.isInitialized = true;
    this.updateBodyOverflow();
    this.idAttr = `overlay-drawer-${RandomUtils.secureChars(12)}`;
  }

  ngOnDestroy() {
    this.doc.body.classList.remove('overflow-hidden');
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes['isOpen']) {
      this.doc.body.classList.toggle("overflow-hidden", this.isOpen);
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    if (this.isOpen) {
      this.close();
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdropClick()) {
      this.close();
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.updateBodyOverflow();
    this.closed.emit(false);
  }

  close() {
    this.isOpen = false;
    this.closed.emit(true);
  }

  markChange = () => {
    this.updateBodyOverflow();
    this.changeDetector.detectChanges();
  }

  protected isPlainHeaderText(value: any) {
    return typeof value === "string";
  }

  private updateBodyOverflow = () => {
    if (!this.isInitialized) return;
    this.doc.body.classList.toggle('overflow-hidden', this.isOpen);
  }
}
