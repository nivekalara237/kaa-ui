import {Color, Size, Status} from '../types';

const avatarSizeMapping: Record<Size, string> = {
  tiny: 'w-6 h-6',
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-20 h-20',
  giant: 'w-36 h-36',
};

const avatarIndicatorRepositionBasedShapeMapping: Record<Size, string> = {
  tiny: 'w-6 h-6',
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-20 h-20',
  giant: 'w-36 h-36',
};

const avatarIndicatorSizeMapping: Record<'roundedOrSquare' | 'circle', Record<'top' | 'bottom', Record<Size, string>>> = {
  roundedOrSquare: {
    top: {
      tiny: '-top-1 left-5 w-2 h-2 border',
      small: '-top-1 left-6 w-3 h-3 border-[2.5px]',
      medium: '-top-1.5 left-8 w-3.5 h-3.5 border-2',
      large: '-top-2 left-[71px] w-4 h-4 border-2',
      giant: '-top-2 left-32 w-5 h-5 border-2',
    },
    bottom: {
      tiny: '-bottom-1 left-5 w-2 h-2 border',
      small: '-bottom-1 left-6 w-3 h-3 border-[2.5px]',
      medium: '-bottom-1.5 left-8 w-3.5 h-3.5 border-2',
      large: '-bottom-2 left-[71px] w-4 h-4 border-2',
      giant: '-bottom-2 left-32 w-5 h-5 border-2',
    }
  },
  circle: {
    top: {
      tiny: 'top-0 left-4 w-2 h-2 border',
      small: 'top-0 left-6 w-3 h-3 border-[2.5px]',
      medium: 'top-0 left-7 w-3.5 h-3.5 border-2',
      large: 'top-0 left-14 w-4 h-4 border-2',
      giant: 'top-0 left-24 w-5 h-5 border-2',
    },
    bottom: {
      tiny: 'bottom-0 left-4 w-2 h-2 border',
      small: 'bottom-0 left-6 w-3 h-3 border-[2.5px]',
      medium: 'bottom-0 left-7 w-3.5 h-3.5 border-2',
      large: 'bottom-0 left-14 w-4 h-4 border-2',
      giant: 'bottom-0 left-24 w-5 h-5 border-2',
    }
  }
};

/*
const avatarIndicatorSizeMapping: Record<'top' | 'bottom', Record<Size, string>> = {
  top: {
    tiny: 'top-0 left-4 w-2 h-2 border',
    small: 'top-0 left-6 w-3 h-3 border-[2.5px]',
    medium: 'top-0 left-7 w-3.5 h-3.5 border-2',
    large: 'top-0 left-14 w-4 h-4 border-2',
    giant: 'top-0 left-24 w-5 h-5 border-2',
  },
  bottom: {
    tiny: 'bottom-0 left-4 w-2 h-2 border',
    small: 'bottom-0 left-6 w-3 h-3 border-[2.5px]',
    medium: 'bottom-0 left-7 w-3.5 h-3.5 border-2',
    large: 'bottom-0 left-14 w-4 h-4 border-2',
    giant: 'bottom-0 left-24 w-5 h-5 border-2',
  }
};*/

const avatarIndicatorColorMapping: Record<Status | Color, string> = {
  danger: 'bg-red-400',
  default: 'bg-gray-400',
  info: 'bg-sky-400',
  primary: 'bg-blue-400',
  secondary: 'bg-slate-400',
  soft: 'bg-fuchsia-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  slate: "bg-slate-400",
  gray: "bg-gray-400",
  zinc: "bg-zinc-400",
  neutral: "bg-neutral-400",
  stone: "bg-stone-400",
  red: "bg-red-400",
  orange: "bg-orange-400",
  ember: "bg-ember-400",
  yellow: "bg-yellow-400",
  lime: "bg-lime-400",
  green: "bg-green-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  teal: "bg-teal-400",
  cyan: "bg-cyan-400",
  sky: "bg-sky-400",
  blue: "bg-blue-400",
  indigo: "bg-indigo-400",
  violet: "bg-violet-400",
  purple: "bg-purple-400",
  fuchsia: "bg-fuchsia-400",
  pink: "bg-pink-400",
  rose: "bg-rose-400",
};

export {
  avatarSizeMapping,
  avatarIndicatorSizeMapping,
  avatarIndicatorColorMapping,
  avatarIndicatorRepositionBasedShapeMapping
}
