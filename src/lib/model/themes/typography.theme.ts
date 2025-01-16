import {Color, Heading, Size} from '../types';

const variantBase: Record<Heading, string> = {
  h1: "dark:text-white text-4xl font-extrabold",
  h2: 'dark:text-white text-4xl font-bold',
  h3: 'dark:text-white text-3xl font-bold',
  h4: 'dark:text-white text-2xl font-bold',
  h5: 'dark:text-white text-xl font-bold',
  h6: 'dark:text-white text-lg font-semibold'
}

const paragraphFirstLetter: string = "first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-800 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start"

const link = "font-medium text-blue-600 underline dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline"

const hrSize: Record<Size | 'full', string> = {
  tiny: 'w-12 h-1',
  small: 'w-24 h-1',
  medium: 'w-48 h-1',
  large: 'w-72 h-1',
  giant: 'w-98 h-1',
  full: 'w-full h-1'
}
const paragraphTextSizeMapping: Record<Size | 'normal', string> = {
  tiny: 'text-xs',
  small: 'text-sm',
  medium: 'text-lg',
  normal: 'text-[12px]',
  large: 'text-xl',
  giant: 'text-2xl',
}

const typographyHrColorMapping: Record<Color, string> = {
  slate: 'bg-slate-100 border-0 rounded md:my-10 dark:bg-slate-700',
  gray: 'bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700',
  zinc: 'bg-zinc-100 border-0 rounded md:my-10 dark:bg-zinc-700',
  neutral: 'bg-neutral-100 border-0 rounded md:my-10 dark:bg-neutral-700',
  stone: 'bg-stone-100 border-0 rounded md:my-10 dark:bg-stone-700',
  red: 'bg-red-100 border-0 rounded md:my-10 dark:bg-red-700',
  orange: 'bg-orange-100 border-0 rounded md:my-10 dark:bg-orange-700',
  ember: 'bg-ember-100 border-0 rounded md:my-10 dark:bg-ember-700',
  yellow: 'bg-yellow-100 border-0 rounded md:my-10 dark:bg-yellow-700',
  lime: 'bg-lime-100 border-0 rounded md:my-10 dark:bg-lime-700',
  green: 'bg-green-100 border-0 rounded md:my-10 dark:bg-green-700',
  emerald: 'bg-emerald-100 border-0 rounded md:my-10 dark:bg-emerald-700',
  amber: 'bg-amber-100 border-0 rounded md:my-10 dark:bg-amber-700',
  teal: 'bg-teal-100 border-0 rounded md:my-10 dark:bg-teal-700',
  cyan: 'bg-cyan-100 border-0 rounded md:my-10 dark:bg-cyan-700',
  sky: 'bg-sky-100 border-0 rounded md:my-10 dark:bg-sky-700',
  blue: 'bg-blue-100 border-0 rounded md:my-10 dark:bg-blue-700',
  indigo: 'bg-indigo-100 border-0 rounded md:my-10 dark:bg-indigo-700',
  violet: 'bg-violet-100 border-0 rounded md:my-10 dark:bg-violet-700',
  purple: 'bg-purple-100 border-0 rounded md:my-10 dark:bg-purple-700',
  fuchsia: 'bg-fuchsia-100 border-0 rounded md:my-10 dark:bg-fuchsia-700',
  pink: 'bg-pink-100 border-0 rounded md:my-10 dark:bg-pink-700',
  rose: 'bg-rose-100 border-0 rounded md:my-10 dark:bg-rose-700',
};

const typographyTextColor300Mapping: Record<Color, string> = {
  slate: 'text-slate-300',
  gray: 'text-gray-300',
  zinc: 'text-zinc-300',
  neutral: 'text-neutral-300',
  stone: 'text-stone-300',
  red: 'text-red-300',
  orange: 'text-orange-300',
  ember: 'text-ember-300',
  yellow: 'text-yellow-300',
  lime: 'text-lime-300',
  green: 'text-green-300',
  emerald: 'text-emerald-300',
  amber: 'text-amber-300',
  teal: 'text-teal-300',
  cyan: 'text-cyan-300',
  sky: 'text-sky-300',
  blue: 'text-blue-300',
  indigo: 'text-indigo-300',
  violet: 'text-violet-300',
  purple: 'text-purple-300',
  fuchsia: 'text-fuchsia-300',
  pink: 'text-pink-300',
  rose: 'text-rose-300',
};

const hrMarginYMapping: Record<number, string> = {}

export {
  link,
  variantBase,
  paragraphFirstLetter,
  hrSize,
  typographyHrColorMapping,
  typographyTextColor300Mapping,
  paragraphTextSizeMapping,
  hrMarginYMapping
}
