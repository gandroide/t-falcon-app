import styled from 'styled-components';

export const AdminContainer = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #157416;
`;

export const AdminTitle = styled.h1`
  text-align: center;
  color: #157416;
  font-size: 16px;

  @media screen and (min-width: 576px) {
    font-size: 30px;
  }
`;

export const AdminContent = styled.div`
  padding: 10px;
  width: 100%;

  @media screen and (min-width: 768px) {
    padding: 20px;
  }
`;

export const AdminMainContent = styled.div`
  display: flex;
  background: #fff;
  flex: 1;
`;
