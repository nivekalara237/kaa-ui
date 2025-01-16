import {IconVariant, Size} from '../types';

const iconVariantSizeMapping: Record<IconVariant, Record<Size, string>> = {
  pi: {
    tiny: "text-xs",
    small: "text-sm",
    medium: "text-lg",
    large: "text-2xl",
    giant: "text-4xl"
  },
  fa: {
    tiny: "text-xs",
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl",
    giant: "text-2xl"
  },
  fi: {
    tiny: "text-xs",
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl",
    giant: "text-2xl"
  }
};

export {
  iconVariantSizeMapping
}
