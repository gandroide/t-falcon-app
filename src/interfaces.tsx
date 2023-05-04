import { ChangeEvent, ReactNode } from 'react';

export interface IInputError {
  hasError?: boolean;
  isRequired?: boolean;
}
export interface IInput extends IInputError {
  name: string;
  label: string;
  type: 'text' | 'number' | 'password';
  value: string;
  placeholder: string;
}

export interface IInputSelect extends IInputError {
  name: string;
  label: string;
  type: 'select';
  data: ISelectOption[];
  value: string;
  placeholder: string;
}

export interface IInputCheckbox extends IInputError {
  name: string;
  label: string;
  type: 'checkbox';
  checked: boolean;
}

export interface ITextarea extends Omit<IInput, 'type'>, IInputError {
  type: 'textarea';
}

export interface IInputTime
  extends Omit<IInput, 'type' | 'placeholder'>,
    IInputError {
  type: 'time';
  required: boolean;
}

export interface IInputDate extends Omit<IInput, 'type'>, IInputError {
  type: 'date';
  required: boolean;
}

export type IDefaultInput =
  | IInput
  | IInputCheckbox
  | IInputSelect
  | ITextarea
  | IInputTime
  | IInputDate;

export type IChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ISelectOption
  | ChangeEvent<HTMLTextAreaElement>;

export type InputChangeHandler = (e: IChangeEvent, index: number) => void;

export type InputFocusHandler = (inputName: string) => void;

export function isInputSelect(input: IDefaultInput): input is IInputSelect {
  return input.type === 'select';
}

export function isInputCheckbox(input: IDefaultInput): input is IInputCheckbox {
  return input.type === 'checkbox';
}

export function isSelectOption(event: IChangeEvent): event is ISelectOption {
  return ('name' && 'value' && 'label') in event;
}

export function isTextarea(input: IDefaultInput): input is ITextarea {
  return input.type === 'textarea';
}

export function isInputTime(input: IDefaultInput): input is IInputTime {
  return input.type === 'time';
}

export function isInputDate(input: IDefaultInput): input is IInputDate {
  return input.type === 'date';
}

export function isInputEvent(
  event: IChangeEvent
): event is ChangeEvent<HTMLInputElement> {
  return 'currentTarget' in event;
}

export interface ISubmitData {
  [key: string]: string;
}

export interface IForm {
  title?: string;
  fields: IDefaultInput[];
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

export interface IBirdWeight {
  // id: string;
  nome: string;
  peso: string;
  data: string;
}

export interface IUserData {
  id: string;
  nome: string;
  email: string;
  admistrador: string;
}

export interface UserRegistryData {
  id: string;
  data: string;
  entrada: string;
  saida: string;
}

export interface FullUserRegistryData extends UserRegistryData {
  nome: string;
  latitude_entry?: number;
  longitude_entry?: number;
  latitude_out?: number;
  longitude_out?: number;
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
  placeholder: string;
}

export interface ISearchFilter {
  options: ISelectProps['options'];
  onSearchCallback: () => void;
  onChangeFilterCallback: (
    value: ISelectOption | ChangeEvent<HTMLInputElement>
  ) => void;
  filterValue: string;
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
  callback: (rowData: T, currentPage: number) => void;
}

export interface ITableRender {
  page: number;
  filter: string;
  filterValue: string;
}

export interface ITable<T> {
  data: T[];
  tableActions: ITableAction<T>[];
  count: number;
  onTableRenderCallback: ({ page, filter, filterValue }: ITableRender) => void;
  filterOptions: ISelectOption[];
  onSearchCallback: ({ page, filter, filterValue }: ITableRender) => void;
  hideSearch?: boolean;
  excludeRows?: (keyof T)[];
}

export type SidePanelWidth = 'small' | 'medium' | 'large' | null;

export interface ClientsData {
  id: string;
  nome: string;
}

export interface CarsData {
  id: string;
  matricula: string;
  viatura: string;
}

export interface IServiceReport {
  clientsData: ClientsData[];
  birdsData: IBirdData[];
  carsData: CarsData[];
}

export interface IServiceReportData {
  id: string;
  colaborador: string;
  cliente: string;
  data: string;
}

export interface IServiceReportFull extends IServiceReportData {
  ave: string;
  viatura: string;
  observacoes: string;
  'hora-inicio': string;
  'hora-fim': string;
}

export interface IServiceReportDataFull {
  report: IServiceReportFull;
}
