import {AbstractInput} from './abstract-input';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

export class UnderlineInput extends AbstractInput {
  getInputClassNames(): string {
    // const inputNumberPaddingEnd = this.options.type === "number" ? (this.options.hasIconAt === 'right' ? 'pe-16' : 'pe-4') : "pe-0";
    // const repadding = `py-3 ${this.options.hasIconAt === null ? 'ps-1 pe-0' : (this.options.hasIconAt === 'left' ? 'ps-9 pe-0' : 'ps-2 pe-9')}`;

    const builder = new StringBuilder(twMerge(this.commonInputClassNames()));
    builder.append("bg-transparent dark:bg-transparent")
      .append("border-t-transparent border-b-2 border-x-transparent border-b-gray-200")
      .append("focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-500 focus:ring-0")
      .append("dark:focus:border-b-neutral-400")
      .append("dark:border-b-neutral-600");
    if (!this.options.floatingLabel) {
      builder.append("block")
    } else {
      builder.append("peer placeholder:text-transparent dark:placeholder:text-transparent");
    }
    return twMerge(builder.segments());
  }

  getLabelClassNames(): string {
    const builder = new StringBuilder(this.commonLabelClassNames());

    if (this.options.floatingLabel) {

      builder
        .append("absolute text-base text-gray-400 dark:text-transparent " +
          `${this.options.hasIconAt ? 'ms-9' : 'ms-4'} top-1/2 ` +
          "left-0 start-0 " +
          "transition-all duration-300 truncate ease-in-out " +
          "-translate-y-1/2 origin-[0] " +
          "peer-focus:top-0 peer-focus:bg-white dark:peer-focus:bg-neutral-800 peer-focus:text-sm " +
          "peer-focus:text-gray-500 dark:peer-focus:text-neutral-300 " +
          "peer-placeholder-shown:text-gray-700 dark:peer-placeholder-shown:text-white " +
          "peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-0 " +
          "dark:peer-focus-[:not(:placeholder-shown)]:bg-neutral-800 " +
          "peer-focus-[:not(:placeholder-shown)]:bg-white  dark:peer-[:not(:placeholder-shown)]:bg-neutral-800 " +
          "peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-neutral-500 " +
          "dark:peer-[:not(:placeholder-shown)]:text-neutral-200 " +
          "peer-disabled:opacity-50 " +
          "autofill:px-2 focus:points-events-none pointer-events-none "
        );
    }
    return twMerge(builder.segments());
  }

}
