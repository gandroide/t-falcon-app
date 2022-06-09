export interface IInput {
  name: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
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

export interface IUserData {
  id: string;
  nome: string;
  email: string;
}

export interface UserRegistryData {
  id: string;
  data: string;
  entrada: string;
  saida: string;
}

export interface FullUserRegistryData extends UserRegistryData {
  nome: string;
}

export interface ISelectOption {
  label: string;
  value: string;
  name: string;
}

export interface ISelectProps {
  options: ISelectOption[];
  onChangeHandler: (option: ISelectOption) => void;
  selected: any;
}

export interface ISearchFilter {
  options: ISelectProps['options'];
  onSearchCallback: (filter: string, value: string) => void;
}
