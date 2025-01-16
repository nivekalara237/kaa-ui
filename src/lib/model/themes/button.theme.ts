import {twMerge} from 'tailwind-merge';
import {Color, RoundedSize, Status} from '../types';

const ringx = (color: Color, size = 4) => {
  return `focus:outline-none focus:ring-${size} focus:ring-${color}-200 dark:focus:ring-gray-700`
}

const buttonFilled = {};
const buttonRounded: Record<RoundedSize, string> = {
  none: "round-none",
  small: "rounded",
  medium: "rounded-md",
  large: "rounded-lg",
  full: "rounded-full"
};

const buttonOutlined: Record<Exclude<Status, "soft">, string> = {
  success: " font-bold bg-emerald-100 text-emerald-600 hover:text-white hover:bg-emerald-600 border border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:bg-emerald-900 dark:border-emerald-400 dark:text-emerald-400 dark:hover:text-white dark:hover:bg-emerald-400 dark:focus:ring-emerald-800",
  primary: "font-bold bg-white text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-800",
  secondary: "font-bold bg-slate-100 text-slate-600 hover:text-white hover:bg-slate-600 border border-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:bg-slate-900 dark:border-slate-400 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-400 dark:focus:ring-slate-800",
  info: "font-bold bg-sky-100 text-sky-600 hover:text-white hover:bg-sky-600 border border-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:bg-sky-900 dark:border-sky-400 dark:text-sky-400 dark:hover:text-white dark:hover:bg-sky-400 dark:focus:ring-sky-800",
  warning: "font-bold bg-amber-100 text-amber-600 hover:text-white hover:bg-amber-600 border border-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200 dark:bg-amber-900 dark:border-amber-400 dark:text-amber-400 dark:hover:text-white dark:hover:bg-amber-400 dark:focus:ring-amber-800",
  danger: "font-bold bg-red-100 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 focus:outline-none focus:ring-4 focus:ring-red-200 dark:bg-red-900 dark:border-red-400 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-800",
  // soft: "bg-white text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:border-blue-400 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-800",
  default: "font-bold bg-gray-100 text-gray-600 hover:text-white hover:bg-gray-600 border border-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-900 dark:border-gray-400 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-400 dark:focus:ring-gray-800",
}

const buttonGhost: Record<Status, string> = {
  danger: twMerge('font-bold bg-transparent dark:bg-transparent text-red-400 dark:text-red-400 border-none hover:bg-red-50 dark:hover:bg-gray-700', ringx("red")),
  info: twMerge('font-bold bg-transparent dark:bg-transparent text-sky-400 dark:text-sky-400 border-none hover:bg-sky-50 dark:hover:bg-gray-700', ringx('sky')),
  primary: twMerge('font-bold bg-transparent dark:bg-transparent text-blue-600 dark:text-blue-400 border-none hover:bg-blue-50 dark:hover:bg-gray-700', ringx("blue")),
  secondary: twMerge('font-bold bg-transparent dark:bg-transparent text-slate-400 dark:text-slate-400 border-none hover:bg-slate-50 dark:hover:bg-gray-700', ringx("slate")),
  soft: twMerge('font-bold bg-transparent dark:bg-transparent text-gray-400 dark:text-gray-400 border-none hover:bg-gray-50 dark:hover:bg-gray-700', ringx("gray")),
  success: twMerge('font-bold bg-transparent dark:bg-transparent text-emerald-400 dark:text-emerald-400 border-none hover:bg-emerald-50 dark:hover:bg-gray-700', ringx("emerald")),
  warning: twMerge('font-bold bg-transparent dark:bg-transparent text-amber-400 dark:text-amber-400 border-none hover:bg-amber-50 dark:hover:bg-gray-700', ringx("amber")),
  default: twMerge("font-bold bg-transparent dark:bg-transparent text-gray-400 dark:text-gray-400 border-none hover:bg-gray-50 dark:hover:bg-gray-700", ringx("gray"))
}

const ButtonSize = {
  tiny: "px-1.5 py-1 text-[0.625rem] font-medium",
  small: "px-3 py-1.5 text-[0.75rem] font-medium",
  medium: "px-5 py-2 text-sm font-bold",
  large: "px-5 py-2.5 text-base font-extrabold",
  giant: "px-6 py-3 text-base font-extrabold",
}

const ButtonIconOnlySize = {
  tiny: "px-1 py-1 text-[0.625rem] font-medium",
  small: "px-1.5 py-1.5 text-[0.75rem] font-medium",
  medium: "px-2 py-2 text-sm font-medium",
  large: "px-2.5 py-2.5 text-base font-medium",
  giant: "px-3 py-3 text-base font-medium",
}

const defaultButton: Record<Status, Record<string, string>> = {
  success: {
    coloration: "text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 dark:bg-green-400 dark:hover:bg-green-600 dark:focus:ring-green-700"
  },
  primary: {
    coloration: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-400 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
  },
  secondary: {
    coloration: "text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-200 dark:bg-slate-400 dark:hover:bg-slate-600 dark:focus:ring-slate-700"
  },
  info: {
    coloration: "text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-200 dark:bg-sky-400 dark:hover:bg-sky-600 dark:focus:ring-sky-700"
  },
  warning: {
    coloration: "text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-200 dark:bg-amber-400 dark:hover:bg-amber-600 dark:focus:ring-amber-700"
  },
  default: {
    coloration: "text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
  },
  danger: {
    coloration: "text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-400 dark:hover:bg-red-600 dark:focus:ring-red-700"
  },
  soft: {
    coloration: ""
  }
};

const disabledButton = twMerge("text-gray-500 font-bold dark:text-gray-400 bg-gray-200 dark:bg-gray-700", "cursor-not-allowed");

export {
  buttonFilled,
  ButtonSize,
  buttonOutlined,
  buttonRounded,
  defaultButton,
  buttonGhost,
  disabledButton,
  ButtonIconOnlySize
}
