import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  effect,
  HostBinding,
  inject,
  input,
  OnInit
} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {HorizontalPosition} from '../../../model/types';

@Component({
  selector: 'ui-card-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
  standalone: false,
  providers: [{
    provide: AbstractUIComponent,
    useExisting: CardLinkComponent
  }]
})
export class CardLinkComponent extends AbstractUIComponent implements OnInit {

  text = input();
  link = input.required();
  linkTarget = input<'blank' | 'self' | 'parent' | 'top'>("self");
  position = input<HorizontalPosition>('left');
  left = input(true, {transform: booleanAttribute});
  right = input(false, {transform: booleanAttribute});

  constructor() {
    super(inject(ChangeDetectorRef));
    effect(() => {
      this.setPositionClass;
    });
  }

  _skeleton!: boolean;

  get skeleton() {
    return this._skeleton;
  }

  set skeleton(value: boolean) {
    this._skeleton = value;
    this.changeDetector.detectChanges()
  }

  @HostBinding("attr.class")
  get setPositionClass() {
    return (this.right() || this.position() === 'right') ? 'flex justify-end' : 'flex justify-start'
  }

  compiledClasses(): string {
    const builder = new StringBuilder(
      "group transition-all duration-500 mt-1 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
    );

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }

    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }
}
