import {AbstractInput} from './abstract-input';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {inputGrayBorderMapping, inputRoundedSizeMapping} from '../../../../model/themes/input.theme';

export class GrayInput extends AbstractInput {
  getInputClassNames(): string {
    const builder = new StringBuilder(this.commonInputClassNames());
    builder.append("peer")
      .append("border outline-2 bg-gray-100 dark:bg-transparent")
      .append("focus:bg-transparent dark:focus:bg-transparent dark:focus:ring-neutral-600")
      .append(inputGrayBorderMapping[this.options.size])
      .append(inputRoundedSizeMapping[this.options.roundedSize])
      .append("border-gray-200 focus:ring-0 focus:border-gray-300 focus:ring-gray-500")
      .append("dark:border-neutral-600");

    if (!this.options.floatingLabel) {
    } else {
      builder.append("placeholder:text-transparent dark:placeholder:text-transparent")
        .append(inputRoundedSizeMapping[this.options.roundedSize])
        .append(inputGrayBorderMapping[this.options.size])
      ;
    }
    return twMerge(builder.segments());
  }

  getLabelClassNames(): string {
    const builder = new StringBuilder(this.commonLabelClassNames());
    if (this.options.hiddeLabel) {
      builder.append("sr-only");
    }

    if (!this.options.floatingLabel) {
      builder.append("block");
    } else {
      builder.append("absolute text-gray-400 dark:text-transparent " +
        `${this.options.hasIconAt ? 'ms-9' : 'ms-4'} top-1/2 ` +
        "left-0 start-0 " +
        "transition-all duration-300 truncate ease-in-out " +
        "-translate-y-1/2 origin-[0] " +
        "peer-focus:top-0 peer-focus:bg-white dark:peer-focus:bg-neutral-800 peer-focus:px-2 peer-focus:text-sm " +
        "peer-focus:text-gray-500 dark:peer-focus:text-neutral-300 " +
        "peer-placeholder-shown:text-gray-700 dark:peer-placeholder-shown:text-white " +
        "peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-0 " +

        "peer-[:not(:placeholder-shown)]:bg-gradient-to-t peer-[:not(:placeholder-shown)]:from-gray-100 peer-[:not(:placeholder-shown)]:to-white   " +
        "dark:peer-focus-[:not(:placeholder-shown)]:bg-neutral-800 " +
        "peer-focus-[:not(:placeholder-shown)]:bg-white  dark:peer-[:not(:placeholder-shown)]:bg-neutral-800 " +
        "peer-[:not(:placeholder-shown)]:px-2 " +
        /// $$$$
        "peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-neutral-500 " +
        "dark:peer-[:not(:placeholder-shown)]:text-neutral-200 " +
        "peer-disabled:opacity-50 " +
        "autofill:px-2 focus:points-events-none pointer-events-none "
      )
        .append(
          "dark:peer-[:not(:placeholder-shown)]:bg-gradient-to-t dark:peer-[:not(:placeholder-shown)]:from-neutral-800 dark:peer-[:not(:placeholder-shown)]:to-neutral-800"
        );
    }
    return twMerge(builder.segments());
  }

}
