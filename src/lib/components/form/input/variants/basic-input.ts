import {AbstractInput} from './abstract-input';

export class BasicInput extends AbstractInput {
  getInputClassNames(): string {
    const common = this.commonInputClassNames();
    return `${common}`;
  }

  getLabelClassNames(): string {
    const common = this.commonLabelClassNames();
    return `${common}`;
  }
}
