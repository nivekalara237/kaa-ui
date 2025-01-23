import {Color, HorizontalPosition, InputType, RoundedSize, Size, Status} from '../types';

type InputOptions = {
  hiddeLabel?: boolean;
  size: Size,
  type: InputType,
  hasIconAt: null | HorizontalPosition,
  floatingLabel?: boolean,
  color: Status | Color,
  roundedSize: RoundedSize,
  required?: boolean,
  readonly?: boolean
};

export type  {
  InputOptions
};
