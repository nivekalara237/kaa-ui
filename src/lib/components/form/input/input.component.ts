import {AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, input, OnInit} from '@angular/core';
import {AbstractUIComponent} from '../../abstract.component';
import {ObjectUtils, RandomUtils, StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {Color, HorizontalPosition, IconVariant, InputVariant, Size, Status} from '../../../model/types';
import {InputFactory} from './input.factory';

@Component({
  selector: 'ui-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: AbstractUIComponent,
      useExisting: InputComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'transition-all duration-500'
  }
})
export class InputComponent extends AbstractUIComponent implements OnInit, AfterViewInit {

  label = input<string>();
  // labelDisposition = input<Position>('top');
  placeholder = input<string>();
  inputId = input<string>();
  inputType = input.required<string>();
  inputAddonIcon = input<IconVariant>('pi');
  addonIcon = input<string>();
  addonIconPosition = input<HorizontalPosition>("left");
  variant = input<InputVariant>();
  size = input<Size>('small');
  color = input<Status | Color>('default');
  floatingLabel = input(false, {transform: booleanAttribute});
  gray = input(false, {transform: booleanAttribute});
  underline = input(false, {transform: booleanAttribute});

  ___inputClass!: string;
  ___labelClass!: string;
  ___inputFloatingClass!: string;
  ___labelFloatingClass!: string;
  ___commonVariantClass!: string;
  ___commonLabelVariantClass!: string;
  ___iconClass!: string;


  get getVariant(): InputVariant {
    if (this.variant()) {
      return this.variant()!;
    } else if (this.underline()) {
      return 'underline';
    } else if (this.gray()) {
      return 'gray';
    } else {
      return 'basic';
    }
  }

  id = () => this.inputId() ? this.inputId() : RandomUtils.secureChars(12)

  compiledClasses(): string {
    const builder = new StringBuilder();
    const iconBuilder = new StringBuilder(
      "absolute pointer-events-none peer-disabled:opacity-50 peer-disabled:pointer-events-none"
    );
    const commonBuilder = new StringBuilder();
    const inputBuilder = new StringBuilder();
    const labelBuilder = new StringBuilder();
    const inputFloatingBuilder = new StringBuilder();
    const labelFloatingBuilder = new StringBuilder();

    const factory = new InputFactory({
      color: this.color(),
      floatingLabel: this.floatingLabel(),
      fullRounded: false, //this.rounded(),
      hiddeLabel: ObjectUtils.isNullOrUndefined(this.label()),
      size: this.size(),
      hasIconAt: ObjectUtils.isNotNullAndNotUndefined(this.addonIcon()) ? this.addonIconPosition()! : null
    });

    const input = factory.of(this.getVariant);

    inputBuilder.append(input.getInputClassNames());
    labelBuilder.append(input.getLabelClassNames());

    /*switch (this.getVariant) {
      case "basic": {
        inputBuilder.append("py-3 px-4 block w-full rounded-lg " +
          "disabled:opacity-50 disabled:point-events-none").append(" ");
        labelBuilder.append("block font-medium mb-2").append(" ");
        break
      }
      case "gray":
        inputBuilder.append("peer py-3 px-4 ps-11 block w-full " +
          "border-transparent rounded-lg disabled:opacity-50 " +
          "disabled:pointer-events-none dark:border-transparent")
          .append(" ");
        labelBuilder.append("block font-medium mb-2").append(" ");
        break
      case "underline":
        inputBuilder.append("peer py-3 pe-0 ps-8 block w-full bg-transparent " +
          "border-t-transparent border-b-2 border-x-transparent border-b-gray-200 " +
          "focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 " +
          "focus:ring-0 disabled:opacity-50 disabled:pointer-events-none " +
          "dark:border-b-neutral-700 ").append(" ");
        labelBuilder.append(" ").append(" ");
        break
    }*/
    /*if (this.floatingLabel()) {
      switch (this.getVariant) {
        case "basic":
          inputFloatingBuilder.append(
            `peer ${this.addonIcon() ? 'py-3 pe-4 ps-11' : 'p-3'} ` +
            "w-full px-2 transition-all rounded-lg border border-gray-200 hover:border-gray-100 " +
            "placeholder:text-transparent"
          )
            .append(" ");
          const f = "<input class='peer-[:not(:placeholder-shown)]]:text-sm'/>";
          labelFloatingBuilder
            .append("absolute text-base text-gray-400 dark:text-neutral-500 " +
              `${this.addonIcon() ? 'ms-11' : ''} top-1/2 ` +
              " left-0 start-0 " +
              "transition-all duration-300 truncate ease-in-out " +
              // floating label : Start
              "-translate-y-1/2 origin-[0] " +
              "peer-focus:top-0 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm " +
              "peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 " +
              "peer-placeholder-shown:text-gray-700 " +
              "peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-0 " +
              "peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 " +
              "peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-neutral-500 " +
              "dark:peer-[:not(:placeholder-shown)]:text-neutral-500 " +
              "peer-disabled:opacity-50 " +
              "autofill:px-2 focus:points-events-none pointer-events-none " +
              ""
              // floating label: End
            )
            .append(" ")
          break;
        case "gray":
          inputFloatingBuilder.append(
            `peer ${this.addonIcon() ? 'py-3 pe-4 ps-11' : 'p-3'} block w-full ` +
            "bg-gray-100 border-transparent rounded-lg " +
            "transition-all focus:bg-transparent " +
            "placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 " +
            "disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 " +
            "dark:border-transparent dark:focus:ring-neutral-600 " + // focus:pt-6 focus:pb-2
            "[&:not(:placeholder-shown)]:pt-4 [&:not(:placeholder-shown)]:pb-4 " +


            "autofill:pt-6 autofill:pb-2")
            .append(" ")
          labelFloatingBuilder
            .append("absolute text-sm text-gray-500 dark:text-gray-400 " +
              `${this.addonIcon() ? 'ms-6' : ''} transition ease-in-out duration-500 ` +
              "peer-disabled:pointer-events-none pointer-events-none " +
              "transform -translate-y-4 scale-75 top-0 z-10 origin-[0] " +
              "bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 " +
              "peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-75 " +
              "peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 " +
              "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 " +


              "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1")
            .append(" ")
          break;
        case "underline":
          inputFloatingBuilder.append(
            `peer ${this.addonIcon() ? 'py-4 pe-0 ps-8' : 'py-4 px-0'} block w-full bg-transparent ` +
            "border-t-transparent border-b-2 border-x-transparent border-b-gray-200 " +
            "placeholder:text-transparent focus:border-t-transparent " +
            "focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 " +
            "disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 " +
            "dark:text-neutral-400 " + // focus:pt-6 focus:pb-2
            "dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600 " +
            "[&:not(:placeholder-shown)]:pt-4 [&:not(:placeholder-shown)]:pb-4 " +
            "autofill:pt-6 autofill:pb-2")
            .append(" ");
          labelFloatingBuilder.append(`absolute top-0 start-0 ${this.addonIcon() ? 'ms-8' : ''} py-4 px-0 h-full truncate ` +
            "pointer-events-none transition ease-in-out duration-100 border " +
            "border-transparent origin-[0_0] peer-disabled:opacity-50 " +
            "peer-disabled:pointer-events-none peer-focus:scale-75 " +
            "peer-focus:translate-x-0.5 peer-focus:-translate-y-6 " +
            "peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 " +
            "peer-[:not(:placeholder-shown)]:scale-75 " +
            "peer-[:not(:placeholder-shown)]:translate-x-0.5 " +
            "peer-[:not(:placeholder-shown)]:-translate-y-6 " +
            "peer-[:not(:placeholder-shown)]:text-gray-500 " +
            "dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500")
            .append(" ");
          break;
      }
    }*/
    /*
    if (this.floatingLabel()) {
      switch (this.getVariant) {
        case "basic":
          inputFloatingBuilder.append(
            `peer ${this.addonIcon() ? 'py-4 pe-4 ps-8' : 'p-4'} block w-full rounded-lg ` +
            "border-gray-200 text-sm dark:bg-neutral-900 dark:borber-neutral-700 " +
            "dark:text-neutral-400 border-1 transition duration-500 ease-in-out " +
            "placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 " +
            "disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 " +
            "dark:border-neutral-700 dark:focus:ring-neutral-600")
            .append(" ");
          labelFloatingBuilder
            .append("absolute text-sm text-gray-500 dark:text-gray-400 " +
              `${this.addonIcon() ? 'ms-6' : ''} transition ease-in-out duration-500 ` +
              "peer-disabled:pointer-events-none pointer-events-none " +
              "transform -translate-y-4 scale-75 top-2 z-10 origin-[0] " +
              "bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 " +
              "peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 " +
              "peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 " +
              "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 " +
              "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1")
            .append(" ")
          break;
        case "gray":
          inputFloatingBuilder.append(
            `peer ${this.addonIcon() ? 'py-4 pe-4 ps-8' : 'p-4'} block w-full ` +
            "bg-gray-100 border-transparent rounded-lg " +
            "transition duration-500 ease-in-out " +
            "placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 " +
            "disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 " +
            "dark:border-transparent dark:focus:ring-neutral-600 " + // focus:pt-6 focus:pb-2
            "[&:not(:placeholder-shown)]:pt-4 [&:not(:placeholder-shown)]:pb-4 " +


            "autofill:pt-6 autofill:pb-2")
            .append(" ")
          labelFloatingBuilder
            .append("absolute text-sm text-gray-500 dark:text-gray-400 " +
              `${this.addonIcon() ? 'ms-6' : ''} transition ease-in-out duration-500 ` +
              "peer-disabled:pointer-events-none pointer-events-none " +
              "transform -translate-y-4 scale-75 top-0 z-10 origin-[0] " +
              "bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 " +
              "peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-75 " +
              "peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 " +
              "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 " +


              "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1")
            .append(" ")
          break;
        case "underline":
          inputFloatingBuilder.append(
            `peer ${this.addonIcon() ? 'py-4 pe-0 ps-8' : 'py-4 px-0'} block w-full bg-transparent ` +
            "border-t-transparent border-b-2 border-x-transparent border-b-gray-200 " +
            "placeholder:text-transparent focus:border-t-transparent " +
            "focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 " +
            "disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 " +
            "dark:text-neutral-400 " + // focus:pt-6 focus:pb-2
            "dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600 " +
            "[&:not(:placeholder-shown)]:pt-4 [&:not(:placeholder-shown)]:pb-4 " +
            "autofill:pt-6 autofill:pb-2")
            .append(" ");
          labelFloatingBuilder.append(`absolute top-0 start-0 ${this.addonIcon() ? 'ms-8' : ''} py-4 px-0 h-full truncate ` +
            "pointer-events-none transition ease-in-out duration-100 border " +
            "border-transparent origin-[0_0] peer-disabled:opacity-50 " +
            "peer-disabled:pointer-events-none peer-focus:scale-75 " +
            "peer-focus:translate-x-0.5 peer-focus:-translate-y-6 " +
            "peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 " +
            "peer-[:not(:placeholder-shown)]:scale-75 " +
            "peer-[:not(:placeholder-shown)]:translate-x-0.5 " +
            "peer-[:not(:placeholder-shown)]:-translate-y-6 " +
            "peer-[:not(:placeholder-shown)]:text-gray-500 " +
            "dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500")
            .append(" ");
          break;
      }
    }
    */

    if (this.nativeClassName()) {
      builder.append(this.nativeClassName()).append(" ");
    }

    iconBuilder.append("dark:text-neutral-400")
    if (this.label() && !this.floatingLabel()) {
      iconBuilder.append("inset-y-1/2 start-0 ps-3")
    } else {
      iconBuilder.append("inset-y-0 start-0 flex items-center ps-2")
    }

    this.___iconClass = twMerge(iconBuilder.segments());
    this.___labelClass = twMerge(labelBuilder.toString().split(" "));
    this.___inputClass = twMerge(inputBuilder.segments());
    this.___labelFloatingClass = twMerge(labelFloatingBuilder.toString().split(" "));
    this.___inputFloatingClass = twMerge(inputFloatingBuilder.toString().split(" "));

    return twMerge(builder.segments());
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.elementClass = this.compiledClasses();
  }

}
