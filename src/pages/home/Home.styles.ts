import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.common.white};
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const TopBar = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 20px 0;
  height: 30vh;
`;

export const TopBarInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
  margin-bottom: 20px;
`;

export const MenuItem = styled.div`
  margin: 20px;
`;
