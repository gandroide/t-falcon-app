import styled from 'styled-components';

export const Map = styled.div`
  height: 180px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.palette.common.white}; */
`;

export const HomeImage = styled.span`
  width: 200px;

  & img {
    width: 100%;
    display: block;
  }
`;

export const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  /* align-items: center; */
  /* padding: 20px 0 20px 0; */
  overflow: hidden;
  width: 100%;

  & h1 {
    color: #157416;
    font-size: 20px;
    margin-bottom: 40px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
  /* margin: 20px; */
`;
