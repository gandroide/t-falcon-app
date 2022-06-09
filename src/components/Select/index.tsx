import { FC, useCallback } from 'react';
import { OnChangeValue } from 'react-select';
import { CustomSelect } from './styled';
import { ISelectOption, ISelectProps } from '../../interfaces';

export const Select: FC<ISelectProps> = ({
  options,
  onChangeHandler,
  selected
}) => {
  return (
    <CustomSelect
      onChange={(option) => onChangeHandler(option as ISelectOption)}
      options={options}
      classNamePrefix="Select"
      defaultValue={selected}
    />
  );
};
