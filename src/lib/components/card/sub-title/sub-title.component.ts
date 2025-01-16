import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Component({
  selector: 'ui-card-subtitle',
  templateUrl: './sub-title.component.html',
  styleUrl: './sub-title.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSubTitleComponent extends AbstractUIComponent implements OnInit {

  _skeleton!: boolean;

  get skeleton() {
    return this._skeleton;
  }

  set skeleton(value: boolean) {
    this._skeleton = value;
    this.changeDetector.detectChanges()
  }

  compiledClasses(): string {
    const builder = new StringBuilder("mb-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500 ");

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }
}
