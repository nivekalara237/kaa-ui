import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  input,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Orientation} from '../../../../model/types';
import {RadioButtonComponent} from '../radio-button.component';
import {AbstractUIComponent} from '../../../abstract.component';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {radioGroupOrientation} from '../../../../model/shapes/input.shape';
import {radioGroupBorderMapping} from '../../../../model/themes/input.theme';

@Component({
  selector: 'ka-radio-group',
  standalone: false,
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  providers: [
    {
      provide: AbstractUIComponent,
      useExisting: RadioGroupComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  @ContentChildren(RadioButtonComponent)
  radioChildren!: QueryList<RadioButtonComponent>;
  @ViewChild("container", {read: ViewContainerRef})
  container!: ViewContainerRef;

  orientation = input<Orientation>('horizontal');
  name = input<string>();

  ngAfterViewInit(): void {
    this.container.clear();
    if (this.radioChildren && this.radioChildren.toArray().length > 0) {
      this.radioChildren.forEach(radio => {
        radio.name.set(this.name());
        radio.isItemGroup = true;
        [
          ...radioGroupOrientation[this.orientation()].split(" "),
          ...radioGroupBorderMapping.split(" ")
        ].forEach(s => {
          radio.el.nativeElement.classList.remove(s);
          radio.el.nativeElement.classList.add(s);
        });
      });
      this.changeDetector.detectChanges();
    }
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

  compiledClasses(): string {
    const builder = new StringBuilder("flex w-fit");
    if (this.noBorder) {
      builder.append("");
    } else {
      builder.append("")
    }
    if (this.nativeClassName()) {
      builder.append(this.nativeClassName());
    }
    return twMerge(builder.segments());
  }


}
