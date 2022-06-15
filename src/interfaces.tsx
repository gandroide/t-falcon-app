import { ChangeEvent, ReactNode } from 'react';

export interface IInput {
  name: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  data?: ISelectOption[];
}

export type InputChangeHandler = (
  e: ChangeEvent<HTMLInputElement> | ISelectOption
) => void;

export interface ISubmitData {
  [key: string]: string;
}

export interface IForm {
  title?: string;
  fields: IInput[];
  onSubmitCallback: (fields: ISubmitData) => void;
}

export interface IBirdWeightForm {
  birdsData: IBirdData[];
}

export interface IBirdData {
  id: string;
  nome: string;
  identificação: string;
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

export interface BirdsWeightData {
  id: string;
  nome: string;
  identificação: string;
  peso: string;
  data: string;
}

export interface ITableAction<T> {
  icon: ReactNode;
  callback: (rowData: T) => void;
}

export interface ITable<T> {
  data: T[];
  tableActions: ITableAction<T>[];
  count: number;
  onPageChangeCallback: (page: number) => void;
}
