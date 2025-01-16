import {Color, RoundedSize, Size, Status} from '../types';

const badgeBorderStatusMapping: Record<Status | Color, string> = {
  // Statues
  danger: `border border-red-400`,
  default: `border border-gray-400`,
  info: `border border-sky-400`,
  primary: `border border-blue-400`,
  secondary: `border border-slate-400`,
  soft: `border border-fuchsia-400`,
  success: `border border-emerald-400`,
  warning: `border border-amber-400`,
  // Colors
  slate: 'border border-slate-400',
  gray: 'border border-gray-400',
  zinc: 'border border-zinc-400',
  neutral: 'border border-neutral-400',
  stone: 'border border-stone-400',
  red: 'border border-red-400',
  orange: 'border border-orange-400',
  ember: 'border border-ember-400',
  yellow: 'border border-yellow-400',
  lime: 'border border-lime-400',
  green: 'border border-green-400',
  emerald: 'border border-emerald-400',
  amber: 'border border-amber-400',
  teal: 'border border-teal-400',
  cyan: 'border border-cyan-400',
  sky: 'border border-sky-400',
  blue: 'border border-blue-400',
  indigo: 'border border-indigo-400',
  violet: 'border border-violet-400',
  purple: 'border border-purple-400',
  fuchsia: 'border border-fuchsia-400',
  pink: 'border border-pink-400',
  rose: 'border border-rose-400',
}

const badgeStatusMapping: Record<Status | Color, string> = {
  primary: `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`,
  secondary: `bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300`,
  success: `bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300`,
  info: `bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300`,
  warning: `bg-amber-100 text-amber-800  dark:bg-amber-900 dark:text-amber-300`,
  danger: `bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`,
  default: `bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`,
  soft: `bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300`,
  // Colors
  slate: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
  gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  zinc: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300',
  neutral: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300',
  stone: 'bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  ember: 'bg-ember-100 text-ember-800 dark:bg-ember-900 dark:text-ember-300',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  lime: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  sky: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300',
  pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  rose: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
}

const badgeSizeMapping: Record<Exclude<Size, 'giant'>, string> = {
  large: 'text-lg font-semibold px-3.5 py-2',
  medium: 'text-[1rem] font-medium px-3 py-1.5',
  small: 'text-sm font-medium px-2.5 py-1',
  tiny: 'text-xs font-medium px-1.5 py-0.5'
}

const badgeBorderSizeMapping: Record<Exclude<Size, 'giant'>, string> = {
  large: 'border-2',
  medium: 'border-2',
  small: '',
  tiny: ''
}

const badgeRoundedSizeMapping: Record<RoundedSize, string> = {
  none: "round-none",
  small: "rounded",
  medium: "rounded-xl",
  large: "rounded-2xl",
  full: "rounded-full"
};

const badgeCloseableButtonSizeMapping: Record<Size, string> = {
  tiny: "w-1.5 w-1.5",
  small: "w-2.5 w-2.5",
  medium: "w-3 w-3",
  large: "w-4 w-4",
  giant: "w-4.5 w-4.5"
};

const badgeCloseableButtonHoverColorMapping: Record<Status | Color, string> = {
  danger: 'hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300',
  default: 'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300',
  info: 'hover:bg-sky-200 hover:text-sky-900 dark:hover:bg-sky-800 dark:hover:text-sky-300',
  primary: 'hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300',
  secondary: 'hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-300',
  soft: 'hover:bg-fuchsia-200 hover:text-fuchsia-900 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-300',
  success: 'hover:bg-emerald-200 hover:text-emerald-900 dark:hover:bg-emerald-800 dark:hover:text-emerald-300',
  warning: 'hover:bg-amber-200 hover:text-amber-900 dark:hover:bg-amber-800 dark:hover:text-amber-300',
  slate: 'hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-300',
  gray: 'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300',
  zinc: 'hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-300',
  neutral: 'hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-300',
  stone: 'hover:bg-stone-200 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-300',
  red: 'hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300',
  orange: 'hover:bg-orange-200 hover:text-orange-900 dark:hover:bg-orange-800 dark:hover:text-orange-300',
  ember: 'hover:bg-ember-200 hover:text-ember-900 dark:hover:bg-ember-800 dark:hover:text-ember-300',
  yellow: 'hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300',
  lime: 'hover:bg-lime-200 hover:text-lime-900 dark:hover:bg-lime-800 dark:hover:text-lime-300',
  green: 'hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300',
  emerald: 'hover:bg-emerald-200 hover:text-emerald-900 dark:hover:bg-emerald-800 dark:hover:text-emerald-300',
  amber: 'hover:bg-amber-200 hover:text-amber-900 dark:hover:bg-amber-800 dark:hover:text-amber-300',
  teal: 'hover:bg-teal-200 hover:text-teal-900 dark:hover:bg-teal-800 dark:hover:text-teal-300',
  cyan: 'hover:bg-cyan-200 hover:text-cyan-900 dark:hover:bg-cyan-800 dark:hover:text-cyan-300',
  sky: 'hover:bg-sky-200 hover:text-sky-900 dark:hover:bg-sky-800 dark:hover:text-sky-300',
  blue: 'hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300',
  indigo: 'hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300',
  violet: 'hover:bg-violet-200 hover:text-violet-900 dark:hover:bg-violet-800 dark:hover:text-violet-300',
  purple: 'hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300',
  fuchsia: 'hover:bg-fuchsia-200 hover:text-fuchsia-900 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-300',
  pink: 'hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300',
  rose: 'hover:bg-rose-200 hover:text-rose-900 dark:hover:bg-rose-800 dark:hover:text-rose-300',
}

export {
  badgeStatusMapping,
  badgeSizeMapping,
  badgeBorderStatusMapping,
  badgeRoundedSizeMapping,
  badgeBorderSizeMapping,
  badgeCloseableButtonHoverColorMapping,
  badgeCloseableButtonSizeMapping
}
