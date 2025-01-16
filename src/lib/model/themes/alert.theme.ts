import {AlertRoundedSize, Color, Size, Status} from '../types';

const alertStatusMapping: Record<Status | Color, string> = {
  danger: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
  default: 'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
  info: 'text-sky-800 bg-sky-50 dark:bg-gray-800 dark:text-sky-400',
  primary: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
  secondary: 'text-slate-800 bg-slate-50 dark:bg-gray-800 dark:text-slate-400',
  soft: 'text-fuchsia-800 bg-fuchsia-50 dark:bg-gray-800 dark:text-fuchsia-400',
  success: 'text-emerald-800 bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400',
  warning: 'text-amber-800 bg-amber-50 dark:bg-gray-800 dark:text-amber-400',

  slate: 'text-slate-800 bg-slate-50 dark:bg-gray-800 dark:text-slate-400',
  gray: 'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
  zinc: 'text-zinc-800 bg-zinc-50 dark:bg-gray-800 dark:text-zinc-400',
  neutral: 'text-neutral-800 bg-neutral-50 dark:bg-gray-800 dark:text-neutral-400',
  stone: 'text-stone-800 bg-stone-50 dark:bg-gray-800 dark:text-stone-400',
  red: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
  orange: 'text-orange-800 bg-orange-50 dark:bg-gray-800 dark:text-orange-400',
  ember: 'text-ember-800 bg-ember-50 dark:bg-gray-800 dark:text-ember-400',
  yellow: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400',
  lime: 'text-lime-800 bg-lime-50 dark:bg-gray-800 dark:text-lime-400',
  green: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
  emerald: 'text-emerald-800 bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400',
  amber: 'text-amber-800 bg-amber-50 dark:bg-gray-800 dark:text-amber-400',
  teal: 'text-teal-800 bg-teal-50 dark:bg-gray-800 dark:text-teal-400',
  cyan: 'text-cyan-800 bg-cyan-50 dark:bg-gray-800 dark:text-cyan-400',
  sky: 'text-sky-800 bg-sky-50 dark:bg-gray-800 dark:text-sky-400',
  blue: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
  indigo: 'text-indigo-800 bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400',
  violet: 'text-violet-800 bg-violet-50 dark:bg-gray-800 dark:text-violet-400',
  purple: 'text-purple-800 bg-purple-50 dark:bg-gray-800 dark:text-purple-400',
  fuchsia: 'text-fuchsia-800 bg-fuchsia-50 dark:bg-gray-800 dark:text-fuchsia-400',
  pink: 'text-pink-800 bg-pink-50 dark:bg-gray-800 dark:text-pink-400',
  rose: 'text-rose-800 bg-rose-50 dark:bg-gray-800 dark:text-rose-400',
}

const alertSolidStatusMapping: Record<Status, string> = {
  danger: 'text-white bg-red-500 dark:text-white dark:bg-red-500',
  default: 'text-white bg-gray-500 dark:text-white dark:bg-gray-500',
  info: 'text-white bg-sky-500 dark:text-white dark:bg-sky-500',
  primary: 'text-white bg-blue-500 dark:text-white dark:bg-blue-500',
  secondary: 'text-white bg-slate-500 dark:text-white dark:bg-slate-500',
  soft: 'text-white bg-fuchsia-500 dark:text-white dark:bg-fuchsia-500',
  success: 'text-white bg-emerald-500 dark:text-white dark:bg-emerald-500',
  warning: 'text-white bg-amber-500 dark:text-white dark:bg-amber-500'
}

const alertSizeMapping: Record<Size, string> = {
  giant: '', large: '', medium: '', small: '', tiny: ''
}

const alertRoundedSizeMapping: Record<AlertRoundedSize, string> = {
  large: 'rounded-xl',
  small: 'rounded-md',
  medium: 'rounded-lg',
  none: 'rounded-none',
  full: 'rounded-full'
}

const alertAccentStatusMapping: Record<Status, string> = {
  danger: 'border-red-300 dark:border-red-800',
  default: 'border-gray-300 dark:border-gray-800',
  info: 'border-sky-300 dark:border-sky-800',
  primary: 'border-blue-300 dark:border-blue-800',
  secondary: 'border-slate-300 dark:border-slate-800',
  soft: 'border-fuchsia-300 dark:border-fuchsia-800',
  success: 'border-emerald-300 dark:border-emerald-800',
  warning: 'border-amber-300 dark:border-amber-800'
}

const alertBorderStatusMapping: Record<Status, string> = {
  danger: 'border-red-300 dark:border-red-800',
  default: 'border-gray-300 dark:border-gray-800',
  info: 'border-sky-300 dark:border-sky-800',
  primary: 'border-blue-300 dark:border-blue-800',
  secondary: 'border-slate-300 dark:border-slate-800',
  soft: 'border-fuchsia-300 dark:border-fuchsia-800',
  success: 'border-emerald-300 dark:border-emerald-800',
  warning: 'border-amber-300 dark:border-amber-800'
}

const alertDismissibleButtonStatusMapping: Record<Status, string> = {
  danger: 'bg-red-50 text-red-500 focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700',
  default: 'bg-gray-50 text-gray-500 focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700',
  info: 'bg-sky-50 text-sky-500 focus:ring-2 focus:ring-sky-400 p-1.5 hover:bg-sky-200 dark:bg-gray-800 dark:text-sky-400 dark:hover:bg-gray-700',
  primary: 'bg-blue-50 text-blue-500 focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700',
  secondary: 'bg-slate-50 text-slate-500 focus:ring-2 focus:ring-slate-400 p-1.5 hover:bg-slate-200 dark:bg-gray-800 dark:text-slate-400 dark:hover:bg-gray-700',
  soft: 'bg-fuchsia-50 text-fuchsia-500 focus:ring-2 focus:ring-fuchsia-400 p-1.5 hover:bg-fuchsia-200 dark:bg-gray-800 dark:text-fuchsia-400 dark:hover:bg-gray-700',
  success: 'bg-emerald-50 text-emerald-500 focus:ring-2 focus:ring-emerald-400 p-1.5 hover:bg-emerald-200 dark:bg-gray-800 dark:text-emerald-400 dark:hover:bg-gray-700',
  warning: 'bg-amber-50 text-amber-500 focus:ring-2 focus:ring-amber-400 p-1.5 hover:bg-amber-200 dark:bg-gray-800 dark:text-amber-400 dark:hover:bg-gray-700'
}

export {
  alertSizeMapping,
  alertStatusMapping,
  alertSolidStatusMapping,
  alertDismissibleButtonStatusMapping,
  alertAccentStatusMapping,
  alertBorderStatusMapping,
  alertRoundedSizeMapping
}
