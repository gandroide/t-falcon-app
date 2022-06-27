import styled from 'styled-components';

export const Panel = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.common.white};
  color: ${({ theme }) => theme.palette.common.black};
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  @media screen and (min-width: 576px) {
    width: 50%;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 1000;
`;

export const Backdrop = styled.div`
  width: 100%;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ChildrenContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 3rem;
  flex-direction: column;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: 20px;
  width: 20%;
  z-index: 1;
`;

export const ContentComponent = styled.div`
  padding-top: 4rem;
  display: flex;
  align-items: center;
  width: 100%;
`;
