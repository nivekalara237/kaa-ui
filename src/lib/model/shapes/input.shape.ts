import {Size} from '../types';

const checkboxSizeMapping: Record<Size, string> = {
  tiny: 'w-4 h-4',
  small: 'w-5 h-5',
  medium: 'w-[1.75rem] h-[1.75rem]',
  large: 'w-[2.25rem] h-[2.25rem]',
  giant: 'w-11 h-11',
};

const checkboxIconSizeMapping: Record<Size, string> = {
  tiny: 'w-2.5 h-2.5',
  small: 'w-3.5 h-3.5',
  medium: 'w-5 h-5',
  large: 'w-7 h-7',
  giant: 'w-9 h-9',
};

const checkboxBorderMapping: Record<Size, string> = {
  tiny: 'border-[1px]',
  small: 'border-2',
  medium: 'border-2',
  large: 'border-[3px]',
  giant: 'border-4',
};

export {
  checkboxSizeMapping,
  checkboxBorderMapping,
  checkboxIconSizeMapping
}
