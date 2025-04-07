export interface SelectOptionItem {
  label: string | { text: string, html: HTMLElement };
  value: any;
  id?: string;
  disabled?: boolean;
  extraData?: any;
}
