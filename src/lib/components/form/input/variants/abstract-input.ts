import {HorizontalPosition} from '../../../../model/types';
import {InputOptions} from '../../../../model/options/input.options';


export abstract class AbstractInput {
  constructor(
    private options: InputOptions,
  ) {
  }

  abstract getInputClassNames(): string;

  abstract getLabelClassNames(): string;

  hasIconAt = (): null | HorizontalPosition => null

  commonInputClassNames = (): string => {
    const padding = `${this.options.hasIconAt === null ? 'p-3' : (this.options.hasIconAt === 'left' ? 'py-3 pe-4 ps-11' : 'py-3 ps-4 pe-11')}`;
    return `${padding}`
  };

  commonLabelClassNames = (): string => {
    const padding = `${this.hasIconAt() === null ? 'p-3' : (this.hasIconAt() === 'left' ? 'py-3 pe-4 ps-11' : 'py-3 ps-4 pe-11')}`;
    return `${padding}`
  };
}
