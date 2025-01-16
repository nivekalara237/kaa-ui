import {RoundedSize, Size, Status, Variant} from '../types';

export interface ButtonOptions {
  type: Status,
  size: Size;
  icon?: string;
  iconPosition?: "right" | "left";
  rounded?: RoundedSize;
  variant?: Variant,
  shadows?: boolean;
  label?: string;
  loadingIndicator?: boolean;
  disabled?: boolean;
  buttonTagType?: "submit" | "reset" | "button"
}
