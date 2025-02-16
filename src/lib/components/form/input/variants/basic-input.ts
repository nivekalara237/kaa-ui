import {AbstractInput} from './abstract-input';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {inputFloatingLabelTextSize, inputRoundedSizeMapping} from '../../../../model/themes/input.theme';

export class BasicInput extends AbstractInput {
  getInputClassNames(): string {
    const builder = new StringBuilder(this.commonInputClassNames());
    builder.append(inputRoundedSizeMapping[this.options.roundedSize]);
    if (!this.options.floatingLabel) {
      builder.append("border-gray-200 focus:border-blue-500 focus:ring-blue-500 " +
        "dark:border-neutral-700 dark:focus:ring-neutral-600");
    } else {
      builder.append(
        "peer w-full px-4 transition-all border border-gray-200 " +
        "placeholder:text-transparent dark:placeholder:text-transparent")
        .append("dark:text-white dark:border-neutral-700");
    }

    return twMerge(builder.segments());
  }

  getLabelClassNames(): string {
    const builder = new StringBuilder(this.commonLabelClassNames());
    builder.append("text-neutral-700 dark:text-white");
    if (!this.options.floatingLabel) {
      if (this.options.hiddeLabel) {
        builder.append("sr-only");
      }
      builder.append("block");
    } else {
      // const f = "<input class='peer-[:not(:placeholder-shown)]]:text-sm'/>";
      builder
        .append(inputFloatingLabelTextSize[this.options.size])
        .append("absolute text-gray-400 dark:text-transparent " +
          `${this.options.hasIconAt ? 'ms-9' : 'ms-4'} top-1/2 ` +
          "left-0 start-0 " +
          "transition-all duration-300 truncate ease-in-out " +
          "-translate-y-1/2 origin-[0] " +
          "peer-focus:top-0 peer-focus:bg-white dark:peer-focus:bg-neutral-800 peer-focus:px-2 " +
          "peer-focus:text-gray-500 dark:peer-focus:text-neutral-300 " +
          "peer-placeholder-shown:text-gray-700 dark:peer-placeholder-shown:text-white " +
          "peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-0 " +
          "peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-neutral-800 peer-[:not(:placeholder-shown)]:px-2 " +
          "peer-[:not(:placeholder-shown)]:text-neutral-500 " +
          "dark:peer-[:not(:placeholder-shown)]:text-neutral-200 " +
          "peer-disabled:opacity-50 " +
          "autofill:px-2 focus:points-events-none pointer-events-none "
        );
    }
    return twMerge(builder.segments());
  }
}
