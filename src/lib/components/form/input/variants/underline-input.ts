import {AbstractInput} from './abstract-input';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';

export class UnderlineInput extends AbstractInput {
  getInputClassNames(): string {
    const builder = new StringBuilder(this.commonInputClassNames());
    /**
     ("peer py-3 pe-0 ps-8 block w-full bg-transparent " +
     "border-t-transparent border-b-2 border-x-transparent border-b-gray-200 " +
     "focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 " +
     "focus:ring-0 disabled:opacity-50 disabled:pointer-events-none " +
     "dark:border-b-neutral-700 ")
     */

    const repadding = `py-3 ${this.options.hasIconAt === null ? 'ps-1 pe-0' : (this.options.hasIconAt === 'left' ? 'ps-9 pe-0' : 'ps-2 pe-9')}`;
    builder.append("bg-transparent dark:bg-transparent")
      .append("border-t-transparent border-b-2 border-x-transparent border-b-gray-200")
      .append("focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-500 focus:ring-0")
      .append("dark:focus:border-b-neutral-400")
      .append("dark:border-b-neutral-600")
      .append(repadding)
    return twMerge(builder.segments());
  }

  getLabelClassNames(): string {
    const builder = new StringBuilder(this.commonLabelClassNames());
    return twMerge(builder.segments());
  }

}
