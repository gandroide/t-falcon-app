import { useCallback, useState } from 'react';
import { ISearchFilter } from '../interfaces';

export const useFilter = () => {
  const [filter, setFilter] = useState('');
  const [value, setValue] = useState('');

  const onChangeFilterHandler = useCallback<
    ISearchFilter['onChangeFilterCallback']
  >(
    (value) => {
      if ('currentTarget' in value) {
        setValue(value.currentTarget.value);
      } else {
        setFilter(value.value);
      }
    },
    [setValue, setFilter]
  );

  return { filter, value, onChangeFilterHandler };
};
