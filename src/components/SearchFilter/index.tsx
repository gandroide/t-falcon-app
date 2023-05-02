import { FC } from 'react';
import { ISearchFilter } from '../../interfaces';
import { Select } from '../Select';
import { SearchButton, SearchContainer, SearchInput } from './styled';

export const SearchFilter: FC<ISearchFilter> = ({
  options,
  onSearchCallback,
  onChangeFilterCallback,
  filterValue
}) => {
  const onFilterHandler = () => {
    onSearchCallback();
  };

  return (
    <SearchContainer>
      <Select
        options={options}
        onChangeHandler={onChangeFilterCallback}
        selected
        placeholder=""
      />
      <SearchInput value={filterValue} onChange={onChangeFilterCallback} />
      <SearchButton onClick={onFilterHandler}>Pesquisar</SearchButton>
    </SearchContainer>
  );
};
