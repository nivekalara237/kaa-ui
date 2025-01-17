import {Color, HorizontalPosition, Size, Status} from '../types';

type InputOptions = {
  hiddeLabel?: boolean;
  size: Size,
  hasIconAt: null | HorizontalPosition,
  floatingLabel?: boolean,
  color: Status | Color,
  fullRounded?: boolean
};

export type  {
  InputOptions
};
