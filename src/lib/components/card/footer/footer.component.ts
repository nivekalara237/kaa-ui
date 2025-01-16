import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

@Component({
  selector: 'ui-card-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class CardFooterComponent extends AbstractUIComponent implements OnInit {

  _skeleton!: boolean;

  get skeleton() {
    return this._skeleton;
  }

  set skeleton(value: boolean) {
    this._skeleton = value;
    this.changeDetector.detectChanges()
  }

  compiledClasses(): string {
    const builder = new StringBuilder("mt-2 pt-3 w-full border-t border-gray-200")
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
