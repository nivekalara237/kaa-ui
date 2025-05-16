import {ObjectUtils} from 'co2m.js';

const stringAttribute = (s: string) => ObjectUtils.isNullOrUndefined(s) ? '' : s;
const genericWithDefaultAttribute = <T>(_default: T) => (s: unknown) => ObjectUtils.isNullOrUndefined(s) ? _default : s;

export {
  stringAttribute,
  genericWithDefaultAttribute
}
