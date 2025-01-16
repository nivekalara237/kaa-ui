import {booleanAttribute, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Component({
  selector: 'ui-card-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTitleComponent extends AbstractUIComponent implements OnInit {

  _skeleton!: boolean;

  @Input({transform: booleanAttribute})
  get skeleton() {
    return this._skeleton;
  }

  set skeleton(value: boolean) {
    this._skeleton = value;
    this.changeDetector.detectChanges()
  }

  compiledClasses(): string {
    const builder = new StringBuilder("text-lg font-bold text-gray-800 dark:text-white")
      .append(" ");

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }
}
