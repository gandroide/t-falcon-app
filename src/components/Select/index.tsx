import { FC } from 'react';
import { CustomSelect } from './styled';
import { ISelectOption, ISelectProps } from '../../interfaces';

export const Select: FC<ISelectProps> = ({
  options,
  onChangeHandler,
  selected,
  placeholder
}) => {
  return (
    <CustomSelect
      onChange={(option) => onChangeHandler(option as ISelectOption)}
      options={options}
      classNamePrefix="Select"
      defaultValue={selected}
      placeholder={placeholder}
    />
  );
};
