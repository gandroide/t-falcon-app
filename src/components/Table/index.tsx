import { ReactNode } from 'react';
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
  TableNoData
} from './styled';

interface ITableAction<T> {
  icon: ReactNode;
  callback: (id: T) => void;
}

interface ITable<T> {
  data: T[];
  tableActions: ITableAction<T>[];
}

export const Table = <T,>({ data, tableActions }: ITable<T>) => {
  if (!data.length) {
    return <TableNoData>Não existem registos a apresentar</TableNoData>;
  }

  let tableHeader = ['id' as keyof T];
  Object.keys(data[0]).forEach((key) => {
    if (key === 'id') return;

    tableHeader.push(key as keyof T);
  });

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

  return (
    <TableContainer>
      <TableHeader />
      <TableBody />
    </TableContainer>
  );
};
