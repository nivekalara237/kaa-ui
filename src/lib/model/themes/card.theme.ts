import {Status} from '../types';

const cardBorderedColor: Record<Status, string> = {
  danger: 'border border-t-4 border-t-red-600 dark:border-neutral-700 dark:border-t-red-500',
  default: 'border border-t-4 border-t-slate-600 dark:border-neutral-700 dark:border-t-slate-500',
  info: 'border border-t-4 border-t-sky-600 dark:border-neutral-700 dark:border-t-sky-500',
  primary: 'border border-t-4 border-t-blue-600 dark:border-neutral-700 dark:border-t-blue-500',
  secondary: 'border border-t-4 border-t-gray-600 dark:border-neutral-700 dark:border-t-gray-500',
  soft: 'border border-t-4 border-t-fuchsia-600 dark:border-neutral-700 dark:border-t-fuchsia-500',
  success: 'border border-t-4 border-t-emerald-600 dark:border-neutral-700 dark:border-t-emerald-500',
  warning: 'border border-t-4 border-t-amber-600 dark:border-neutral-700 dark:border-t-amber-500'
}

export {
  cardBorderedColor
}
