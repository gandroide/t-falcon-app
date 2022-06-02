export interface IInput {
  name: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  data?: 'soasnfabf';
}

export interface ISubmitData {
  [key: string]: string;
}

export interface IForm {
  fields: IInput[];
  onSubmitCallback: (fields: ISubmitData) => void;
}

export interface IBirdData {
  id: string;
  name: string;
  identification: string;
}
