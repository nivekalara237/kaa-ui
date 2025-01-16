import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {AbstractUIComponent} from '../abstract.component';
import {ObjectUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {
  alertAccentStatusMapping,
  alertBorderStatusMapping,
  alertDismissibleButtonStatusMapping,
  alertRoundedSizeMapping,
  alertSolidStatusMapping,
  alertStatusMapping
} from '../../model/themes/alert.theme';
import {AlertRoundedSize, HorizontalPosition, Status} from '../../model/types';
import {
  NgClass,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet,
  TitleCasePipe
} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {hoverTextColorAndStatusWithDensityMapping} from '../../model/themes/common.theme';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'ui-alert',
  imports: [
    NgIf,
    NgTemplateOutlet,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    TitleCasePipe,
    NgClass,
    NgForOf
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  providers: [{
    provide: AbstractUIComponent,
    useExisting: AlertComponent
  }],
  host: {
    '[@fadeInOut]': 'in'
  },
  animations: [
    trigger('fadeInOut', [
      state("in", style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class AlertComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  @ViewChild("hoster")
  hostElement!: ElementRef<HTMLDivElement>;
  @ViewChild("firstChildAlert")
  firstChildAlert!: ElementRef<HTMLParagraphElement>;


  status = input.required<Status>();
  content = input<string | TemplateRef<any>>();
  title = input<string | TemplateRef<any>>(null!, {alias: 'alertTitle'});
  actions = input<(string | TemplateRef<any>)[]>();
  actionsPosition = input<HorizontalPosition>();

  type = input<string>();

  noIcon = input(true, {transform: booleanAttribute});

  solid = input(false, {transform: booleanAttribute});
  withIcon = input(false, {transform: booleanAttribute});
  dismissible = input(false, {transform: booleanAttribute});
  accent = input(false, {transform: booleanAttribute});
  bordered = input(false, {transform: booleanAttribute});
  roundedSize = input<AlertRoundedSize>('medium');

  handleAction = output<string>();

  _dismissibleButtonClass!: string;
  actionClass!: string;
  protected readonly TemplateRef = TemplateRef;
  protected readonly ObjectUtils = ObjectUtils;

  constructor(
    protected override changeDetector: ChangeDetectorRef,
  ) {
    super(changeDetector);
  }

  compiledClasses(): string {
    const builder = new StringBuilder();

    builder.append(alertStatusMapping[this.status()]).append(" ");
    builder.append(alertRoundedSizeMapping[this.roundedSize()]).append(" ");

    this.actionClass = hoverTextColorAndStatusWithDensityMapping[this.status()]['d500'];

    if (this.solid()) {
      builder.append(alertSolidStatusMapping[this.status()]).append(" ");
    }
    if (this.accent()) {
      builder.append(twMerge("border-t-4", alertAccentStatusMapping[this.status()]))
        .append(" ");
    }

    if (this.bordered()) {
      builder.append(twMerge("border", alertBorderStatusMapping[this.status()]))
        .append(" ");
    }

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }
    return twMerge(builder.toString().split(" "));
  }

  ngOnInit(): void {
    if (this.dismissible()) {
      this._dismissibleButtonClass = twMerge('ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-between h-6 w-6', alertDismissibleButtonStatusMapping[this.status()]);
    }
    this.elementClass = this.compiledClasses();
  }

  handlerDismiss() {
    this.changeDetector.detectChanges();
    const elt = this.firstChildAlert.nativeElement.parentElement;
    if (elt) {
      elt.remove();
    } else {
      console.error("Something occurred while trying to dismiss the alert.")
    }
  }

  ngAfterViewInit(): void {
    this.handlerDismiss.bind(this);

    fromEvent(this.hostElement.nativeElement, 'transitionend')
      .subscribe(value => console.log(value));
  }

  getTpl(action: string | TemplateRef<any>) {
    return <TemplateRef<any>>action;
  }

  handlerActionClick(action: any) {
    this.handleAction.emit(action);
  }
}
