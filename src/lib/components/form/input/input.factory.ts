import {InputVariant} from '../../../model/types';
import {BasicInput} from './variants/basic-input';
import {InputOptions} from '../../../model/options/input.options';
import {AbstractInput} from './variants/abstract-input';
import {UnderlineInput} from './variants/underline-input';
import {GrayInput} from './variants/gray-input';

export class InputFactory {
  constructor(
    private options: InputOptions
  ) {
  }

  of = (inputVariant: InputVariant): AbstractInput => {
    switch (inputVariant) {
      case "basic":
        return new BasicInput(this.options);
      case "underline":
        return new UnderlineInput(this.options);
      case "gray":
        return new GrayInput(this.options);
      default:
        throw new Error(`Unsupported input variant ${inputVariant}`);
    }
  }
}
