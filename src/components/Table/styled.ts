import styled from 'styled-components';

export const TableContainer = styled.table`
  /* border: 1px solid #ddd; */
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHeaderContainer = styled.thead``;

export const TableHeaderRow = styled.tr``;

export const TableHeaderColumn = styled.th`
  padding: 8px;
  border-bottom: 2px solid #eee;
  text-transform: uppercase;
`;

export const TableBodyRow = styled.tr``;

export const TableBodyContainer = styled.tbody`
  & ${TableBodyRow} {
    &:nth-child(odd) {
      background: #eee;
    }
  }
`;

export const TableBodyColumn = styled.td`
  padding: 8px;
`;

export const TableAction = styled.button``;

export const TableActionIcon = styled.span``;

export const TableNoData = styled.p``;

export const TablePaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TablePaginationBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
`;
