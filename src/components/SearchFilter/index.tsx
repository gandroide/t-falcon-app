import React, { FC, useCallback, useState } from 'react';
import { ISearchFilter, ISelectProps } from '../../interfaces';
import { Select } from '../Select';
import { SearchButton, SearchContainer, SearchInput } from './styled';

export const SearchFilter: FC<ISearchFilter> = ({
  options,
  onSearchCallback
}) => {
  const [filter, setFilter] = useState('');
  const [value, setValue] = useState('');

  const onChangeFilterHandler = useCallback<ISelectProps['onChangeHandler']>(
    (option) => {
      setFilter(option.value);
    },
    []
  );

  const onChangeFilterValuehandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.currentTarget.value);
  };

  const onFilterHandler = () => {
    if (!filter || !value) return;

    onSearchCallback(filter, value);
  };

  return (
    <SearchContainer>
      <Select
        options={options}
        onChangeHandler={onChangeFilterHandler}
        selected
      />
      <SearchInput value={value} onChange={onChangeFilterValuehandler} />
      <SearchButton onClick={onFilterHandler}>Filtrar</SearchButton>
    </SearchContainer>
  );
};
