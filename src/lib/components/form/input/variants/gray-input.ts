import {AbstractInput} from './abstract-input';
import {StringBuilder} from 'co2m.js';
import {twMerge} from 'tailwind-merge';
import {inputGrayBorderMapping, inputRoundedSizeMapping} from '../../../../model/themes/input.theme';

export class GrayInput extends AbstractInput {
  getInputClassNames(): string {
    const builder = new StringBuilder(this.commonInputClassNames());
    builder.append("peer")
      .append("border-2 outline-2 bg-gray-100 dark:bg-transparent")
      .append("focus:bg-transparent dark:focus:bg-transparent dark:focus:ring-neutral-600")
      .append(inputGrayBorderMapping[this.options.size])
      .append(inputRoundedSizeMapping[this.options.fullRounded ? 'full' : this.options.size])
      .append("border-gray-500 focus:border-gray-500 focus:ring-gray-500");

    return twMerge(builder.segments());
  }

  getLabelClassNames(): string {
    const builder = new StringBuilder(this.commonLabelClassNames());
    builder.append("block");
    if (this.options.hiddeLabel) {
      builder.append("sr-only");
    }
    return twMerge(builder.segments());
  }

}
