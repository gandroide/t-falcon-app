import { useEffect, useRef, useState } from 'react';
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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { ITable } from '../../interfaces';

const PAGE_SIZE = 10;

export const Table = <T,>({
  data,
  tableActions,
  count,
  onPageChangeCallback
}: ITable<T>) => {
  const firstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    onPageChangeCallback(currentPage);
  }, [currentPage, onPageChangeCallback]);

  if (!data.length) {
    return <TableNoData>Não existem registos a apresentar</TableNoData>;
  }

  let tableHeader = ['id' as keyof T];
  Object.keys(data[0]).forEach((key) => {
    if (key === 'id') return;

    tableHeader.push(key as keyof T);
  });

  const onPageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  const TableHeader = () => {
    return (
      <TableHeaderContainer>
        <TableHeaderRow>
          {tableHeader.map((value) => (
            <TableHeaderColumn key={value as string}>{value}</TableHeaderColumn>
          ))}
          <TableHeaderColumn key="actions">Accões</TableHeaderColumn>
        </TableHeaderRow>
      </TableHeaderContainer>
    );
  };

  const TableBody = () => {
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
              <TableAction onClick={() => callback(row)}>
                <TableActionIcon>{icon}</TableActionIcon>
              </TableAction>
            ))}
          </TableBodyRow>
        ))}
      </TableBodyContainer>
    );
  };

  const TablePagination = () => {
    const paginationArr = [
      <TablePaginationBtn onClick={() => onPageChangeHandler(currentPage - 1)}>
        <MdKeyboardArrowLeft />
      </TablePaginationBtn>
    ];

    for (let page = 1; page <= Math.ceil(count / PAGE_SIZE); page++) {
      paginationArr.push(
        <TablePaginationBtn onClick={() => onPageChangeHandler(page)}>
          {page}
        </TablePaginationBtn>
      );
    }

    paginationArr.push(
      <TablePaginationBtn onClick={() => onPageChangeHandler(currentPage + 1)}>
        <MdKeyboardArrowRight />
      </TablePaginationBtn>
    );

    return (
      <TablePaginationContainer>{[...paginationArr]}</TablePaginationContainer>
    );
  };

  return (
    <>
      <TableContainer>
        <TableHeader />
        <TableBody />
      </TableContainer>
      <TablePagination />
    </>
  );
};
