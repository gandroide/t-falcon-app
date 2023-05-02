import styled from 'styled-components';

export const AdminContainer = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: -20px;
  border: 1px solid #157416;
`;

export const AdminTitle = styled.h1`
  /* margin-bottom: 40px; */
  text-align: center;
  color: #157416;
  font-size: 30px;
`;

export const AdminContent = styled.div`
  /* border: 1px solid #ddd; */
  /* border-left: 1px solid #157416; */
  /* padding-left: 20px; */
  padding: 10px;
  width: 100%;

  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`;

export const AdminMainContent = styled.div`
  display: flex;
  background: #fff;
  /* padding: 20px; */
  flex: 1;
`;
