import {InputOptions} from '../../../../model/options/input.options';
import {StringBuilder} from 'co2m.js';
import {inputPaddingXBySize, inputPaddingYBySize, inputTextSize} from '../../../../model/themes/input.theme';
import {twMerge} from 'tailwind-merge';

export abstract class AbstractInput {
  constructor(
    protected options: InputOptions,
  ) {
  }

  abstract getInputClassNames(): string;

  abstract getLabelClassNames(): string;

  commonInputClassNames = (): string => {
    const builder = new StringBuilder("block w-full shadow-xs leading-relaxed");
    const paddingXNameBuilder = new StringBuilder();
    if (["number"].includes(this.options.type)) {
      paddingXNameBuilder.append("spin");
    } else {
      paddingXNameBuilder.append("nospin");
    }
    if (this.options.hasIconAt) {
      paddingXNameBuilder.append(`icon-${this.options.hasIconAt}`);
    } else {
      paddingXNameBuilder.append("noicon");
    }

    if (this.options.readonly) {
      builder.append("read-only:bg-gray-100 dark:read-only:bg-neutral-700")
        .append("read-only:border-none read-only:ring-0 read-only:outline-0");
    }

    builder.append(inputTextSize[this.options.size])
      .append(inputPaddingYBySize[this.options.size])
      .append(inputPaddingXBySize[paddingXNameBuilder.build('-')][this.options.size])
    ;
    builder.append("dark:bg-neutral-900 dark:text-neutral-400")
      .append("dark:placeholder-neutral-500 dark:focus:ring-neutral-600")
      .append("disabled:opacity-50 disabled:pointer-events-none");

    return builder.build(" ");
  };

  commonLabelClassNames = (): string => {
    const builder = new StringBuilder();
    // const u = "<i class='after:block after:flex after:inline-table after:inline-block'>";
    if (this.options.required) {
      builder.append("after:content-['*'] after:ml-0.5 after:text-red-500")
        .append("after:inline-block after:text-sm after:items-end after:justify-center");
    }
    builder.append("mb-2").append(inputTextSize[this.options.size])
      .append("text-neutral-700 font-medium dark:text-white");
    return twMerge(builder.segments());
  };
}
