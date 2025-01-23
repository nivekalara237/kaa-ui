import {OverflowPosition, RoundedSize, Size, TextareaResize} from '../types';

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

const inputRoundedSizeMapping: Record<RoundedSize | 'tiny', string> = {
  none: 'rounded-none',
  large: 'rounded-2xl',
  medium: 'rounded-lg',
  small: 'rounded-md',
  tiny: 'rounded-sm',
  full: 'rounded-full',
};

const inputTextSize: Record<Size, string> = {
  tiny: 'text-xs',
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  giant: 'text-xl',
};
const inputPaddingYBySize: Record<Size, string> = {
  tiny: 'py-1.5',
  small: 'py-2',
  medium: 'py-2.5',
  large: 'py-3',
  giant: 'py-4',
}

const inputPaddingXBySize: Record<string, Record<Size, string>> = {
  "nospin-noicon": {
    tiny: "px-2.5",
    small: "px-3.5",
    medium: "px-4",
    large: "px-5",
    giant: "px-6"
  },
  "nospin-icon-left": {
    tiny: "ps-8 pe-2.5", // ps-8.5
    small: "ps-9 pe-3.5", // ps-9.5
    medium: "ps-10 pe-4",
    large: "ps-11 pe-5",
    giant: "ps-12 pe-6"
  },
  "nospin-icon-right": {
    tiny: "ps-2.5 pe-8", // pe-8.5
    small: "ps-3.5 pe-9", // pe-9.5
    medium: "ps-4 pe-10",
    large: "ps-5 pe-11",
    giant: "ps-6 pe-12"
  },
  "spin-noicon": {
    tiny: "ps-2.5 pe-8",
    small: "ps-3.5 pe-8",
    medium: "ps-4 pe-8",
    large: "ps-5 pe-8",
    giant: "ps-6 pe-8"
  },
  "spin-icon-left": {
    tiny: "ps-8 pe-8", // ps-8.5
    small: "ps-9 pe-8", // ps-9.5
    medium: "ps-10 pe-8",
    large: "ps-11 pe-8",
    giant: "ps-12 pe-8"
  },
  "spin-icon-right": {
    tiny: "ps-2.5 pe-16",
    small: "ps-3.5 pe-16",
    medium: "ps-4 pe-16",
    large: "ps-5 pe-20",
    giant: "ps-6 pe-20"
  },
};

const inputFloatingLabelTextSize: Record<Size, string> = {
  tiny: 'peer-focus:text-xs peer-[:not(:placeholder-shown)]:text-xs',
  small: 'peer-focus:text-xs peer-[:not(:placeholder-shown)]:text-xs',
  medium: 'peer-focus:text-sm peer-[:not(:placeholder-shown)]:text-sm',
  large: 'peer-focus:text-base peer-[:not(:placeholder-shown)]:text-base',
  giant: 'peer-focus:text-lg peer-[:not(:placeholder-shown)]:text-lg',
};

const inputIconSize: Record<Size, string> = inputTextSize;

const inputNumberPinButtonSize: Record<Size, string> = {
  tiny: 'text-xs',
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  giant: 'text-xl',
};

const textareaResize: Record<Exclude<TextareaResize, undefined>, string> = {
  none: 'resize-none',
  x: 'resize-x',
  xy: 'resize',
  y: 'resize-y'
}

const textareaScrollablePosition: Record<Exclude<OverflowPosition, undefined>, string> = {
  none: 'overflow-hidden',
  x: 'overflow-x-scroll',
  y: 'overflow-y-auto',
  auto: 'overflow-auto',
}

export {
  inputTextSizeMapping,
  inputRoundedSizeMapping,
  inputGrayBorderMapping,
  inputTextSize,
  inputPaddingYBySize,
  inputPaddingXBySize,
  inputFloatingLabelTextSize,
  inputIconSize,
  textareaResize,
  textareaScrollablePosition
}
