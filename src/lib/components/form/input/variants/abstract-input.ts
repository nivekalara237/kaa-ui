import {InputOptions} from '../../../../model/options/input.options';
import {StringBuilder} from 'co2m.js';
import {inputTextSizeMapping} from '../../../../model/themes/input.theme';


export abstract class AbstractInput {
  constructor(
    protected options: InputOptions,
  ) {
  }

  abstract getInputClassNames(): string;

  abstract getLabelClassNames(): string;

  commonInputClassNames = (): string => {
    const builder = new StringBuilder("block w-full");

    const padding = `${this.options.hasIconAt === null ? 'p-3' : (this.options.hasIconAt === 'left' ? 'py-3 pe-4 ps-9' : 'py-3 ps-4 pe-9')}`;
    builder.append(padding);
    builder.append("dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600");
    builder.append("disabled:opacity-50 disabled:pointer-events-none")
      .append(inputTextSizeMapping[this.options.size]);
    return builder.build(" ");
  };

  commonLabelClassNames = (): string => {
    const builder = new StringBuilder();
    builder.append("mb-2").append(inputTextSizeMapping[this.options.size])
      .append("text-neutral-900 font-medium dark:text-white");
    return builder.build(" ");
  };
}
