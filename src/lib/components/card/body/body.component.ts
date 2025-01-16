import {booleanAttribute, Component, input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Component({
  selector: 'ui-card-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  standalone: false
})
export class CardBodyComponent extends AbstractUIComponent implements OnInit {
  scrollable = input(false, {transform: booleanAttribute});
  _skeleton!: boolean;

  get skeleton() {
    return this._skeleton;
  }

  set skeleton(value: boolean) {
    this._skeleton = value;
    this.changeDetector.detectChanges()
  }

  override compiledClasses(): string {
    const builder = new StringBuilder("mb-2").append(" ");

    if (this.scrollable()) {
      builder.append("overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500").append(" ")
    }

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }
}
