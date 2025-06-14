interface SelectOption {
  label: string | { text: string, html: HTMLElement };
  value: any;
  id?: string;
  disabled?: boolean;
  selected?: boolean;
  extraData?: any;
}

interface SelectGroupOption {
  type: 'group',
  label: string,
  key?: string,
  children?: Array<SelectOption>
}

export type {
  SelectGroupOption,
  SelectOption
}
