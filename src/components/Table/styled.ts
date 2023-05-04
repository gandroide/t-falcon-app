import styled from 'styled-components';

interface ITablePagination {
  isSelected?: boolean;
  rotate?: boolean;
}

export const TableContainer = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  text-align: left;
  /* overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; */
  background-color: white;
`;

export const TableHeaderContainer = styled.thead``;

export const TableHeaderRow = styled.tr`
  background-color: white;
  border-bottom: 2px solid green;
`;

export const TableHeaderColumn = styled.th`
  padding: 8px;
  text-transform: uppercase;
  color: #157416;
  font-weight: 700;

  &.table-actions {
    text-align: right;
  }
`;

export const TableBodyRow = styled.tr`
  font-weight: bold;

  border-bottom: 1px solid #1574164d;
`;

export const TableBodyContainer = styled.tbody`
  & ${TableBodyRow} {
    &:nth-child(odd) {
      background: #1574160d;
    }
  }
`;

export const TableBodyColumn = styled.td`
  padding: 10px 8px;
  font-weight: normal;

  &.table-actions {
    text-align: right;

    & svg {
      color: #157416;
    }
  }
`;

export const TableAction = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const TableActionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableNoData = styled.p``;

export const TablePaginationContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  @media screen and (min-width: 768px) {
    justify-content: flex-end;
  }
`;

export const TablePaginationBtn = styled.button<ITablePagination>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#157416')};
  background: ${({ isSelected }) => (isSelected ? '#157416' : '#fff')};
  border: 1px solid
    ${({ isSelected }) => (isSelected ? '#157416' : '#1574164d')};
  transform: ${({ rotate }) => rotate && 'rotate(180deg)'};
`;
