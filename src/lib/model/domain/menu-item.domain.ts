import {IconVariant, Position} from '../types';
import {ObjectUtils} from 'co2m.js';

interface MenuItem {
  children?: MenuItem[];
  label?: string;
  icon?: string | { name: string, variant: IconVariant };
  iconClass?: string;
  routerLink?: string | any[];
  url?: string;
  disabled?: boolean;
  command?: (...args: any[]) => void;

  // for menu
  routerLinkQueryParams?: string[];
  tooltip?: string;
  tooltipPosition?: Position;
  tooltipClass?: string;
  title?: string;
  isSeparator?: boolean;

  badge?: string;
  badgeClass?: string;

  // collapse
  expanded?: boolean;
}

const isIconObject = (item: MenuItem) => {
  return typeof item.icon !== "string" && ObjectUtils.isNotNullAndNotUndefined(item.icon?.name);
}

const getIconObject = (item: MenuItem): { name: string, variant: IconVariant } => {
  return item.icon as { name: string, variant: IconVariant };
}

export {
  isIconObject,
  getIconObject,
  type MenuItem
}
