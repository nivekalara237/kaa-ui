import {Size} from '../types';

const inputTextSizeMapping: Record<Size, string> = {
  giant: 'text-2xl',
  large: 'text-lg',
  medium: 'text-base',
  small: 'text-sm',
  tiny: 'text-xs'
};

const inputGrayBorderMapping: Record<Size, string> = {
  giant: 'border-4',
  large: 'border-[3px]',
  medium: 'border-2',
  small: 'border',
  tiny: 'border-[1px]'
};

const inputRoundedSizeMapping: Record<Size | 'full', string> = {
  giant: 'rounded-2xl',
  large: 'rounded-xl',
  medium: 'rounded-lg',
  small: 'rounded-md',
  tiny: 'rounded-sm',
  full: 'rounded-full'
};

export {
  inputTextSizeMapping,
  inputRoundedSizeMapping,
  inputGrayBorderMapping
}
