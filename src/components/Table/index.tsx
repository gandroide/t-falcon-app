import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDoubleArrow
} from 'react-icons/md';
import { useFilter } from '../../hooks/useFilter';

import { ITable } from '../../interfaces';
import { SearchFilter } from '../SearchFilter';

import {
  TableAction,
  TableActionIcon,
  TableBodyColumn,
  TableBodyContainer,
  TableBodyRow,
  TableContainer,
  TableHeaderColumn,
  TableHeaderContainer,
  TableHeaderRow,
  TableNoData,
  TablePaginationBtn,
  TablePaginationContainer
} from './styled';

const PAGE_SIZE = 10;

export const Table = <T,>({
  data,
  tableActions,
  count,
  onTableRenderCallback,
  filterOptions,
  onSearchCallback,
  hideSearch
}: ITable<T>) => {
  const firstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { filter, onChangeFilterHandler, value } = useFilter();

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    onTableRenderCallback({
      page: currentPage,
      filter,
      filterValue: value
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, onTableRenderCallback]);

  let tableHeader: (keyof T)[] = [];

  if (data.length) {
    tableHeader.push('id' as keyof T);

    Object.keys(data[0]).forEach((key) => {
      if (key === 'id') return;

      tableHeader.push(key as keyof T);
    });
  }

  const onPageChangeHandler = useCallback(
    (page: number) => {
      if (page === 0 || Math.ceil(count / PAGE_SIZE) < page) return;

      setCurrentPage(page);
    },
    [count]
  );

  const TableHeader = () => {
    return (
      <TableHeaderContainer>
        <TableHeaderRow>
          {tableHeader.map((value) => (
            <TableHeaderColumn key={value as string}>{value}</TableHeaderColumn>
          ))}
          {tableActions.length > 0 && (
            <TableHeaderColumn key="actions">Accões</TableHeaderColumn>
          )}
        </TableHeaderRow>
      </TableHeaderContainer>
    );
  };

  const TableBody = () => {
    if (!data.length) return null;

    return (
      <TableBodyContainer>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex}>
            {tableHeader.map((column, columnIndex) => (
              <TableBodyColumn key={`${rowIndex}-${columnIndex}`}>
                {row[column]}
              </TableBodyColumn>
            ))}
            {tableActions.map(({ icon, callback }) => (
              <TableAction onClick={() => callback(row, currentPage)}>
                <TableActionIcon>{icon}</TableActionIcon>
              </TableAction>
            ))}
          </TableBodyRow>
        ))}
      </TableBodyContainer>
    );
  };

  const tablePagination = useMemo(() => {
    if (count <= PAGE_SIZE) return;

    const paginationArr = [
      <TablePaginationBtn rotate onClick={() => onPageChangeHandler(1)}>
        <MdDoubleArrow />
      </TablePaginationBtn>,
      <TablePaginationBtn onClick={() => onPageChangeHandler(currentPage - 1)}>
        <MdKeyboardArrowLeft />
      </TablePaginationBtn>
    ];

    for (let page = currentPage; page < currentPage + 5; page++) {
      paginationArr.push(
        <TablePaginationBtn
          isSelected={currentPage === page}
          onClick={() => onPageChangeHandler(page)}
        >
          {page}
        </TablePaginationBtn>
      );
    }

    paginationArr.push(
      <TablePaginationBtn onClick={() => onPageChangeHandler(currentPage + 1)}>
        <MdKeyboardArrowRight />
      </TablePaginationBtn>
    );

    paginationArr.push(
      <TablePaginationBtn
        onClick={() => onPageChangeHandler(Math.ceil(count / PAGE_SIZE))}
      >
        <MdDoubleArrow />
      </TablePaginationBtn>
    );

    return (
      <TablePaginationContainer>{[...paginationArr]}</TablePaginationContainer>
    );
  }, [count, onPageChangeHandler, currentPage]);

  const onSearchHandler = () => {
    onSearchCallback({ page: currentPage, filter, filterValue: value });
  };

  if (!data.length) {
    return <TableNoData>Não existem registos a apresentar</TableNoData>;
  }

  return (
    <>
      {hideSearch && (
        <SearchFilter
          options={filterOptions}
          onSearchCallback={onSearchHandler}
          onChangeFilterCallback={onChangeFilterHandler}
          filterValue={value}
        />
      )}

      <TableContainer>
        <TableHeader />
        <TableBody />
      </TableContainer>
      {tablePagination && tablePagination}
    </>
  );
};
