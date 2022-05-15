export interface IInput {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  data?: 'soasnfabf';
}

export interface IForm {
  fields: IInput[];
  onSubmitCallback: (fields: IInput[]) => void;
}
