import styled from 'styled-components';

type SidePanelWidth = {
  sidepanelWidth: string;
};

export const Panel = styled.div<SidePanelWidth>`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.common.white};
  color: ${({ theme }) => theme.palette.common.black};
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  overflow: auto;
  @media screen and (min-width: 700px) {
    width: ${({ sidepanelWidth }) => sidepanelWidth};
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

  &.sidepanel-enter .sidepanel-panel {
    right: -100%;
  }

  &.sidepanel-enter-active .sidepanel-panel {
    right: 0;
    transition: right 750ms;
  }

  &.sidepanel-exit .sidepanel-panel {
    right: 0;
  }

  &.sidepanel-exit-active .sidepanel-panel {
    right: -100%;
    transition: right 750ms;
  }

  &.sidepanel-enter .sidepanel-backdrop {
    opacity: 0;
  }

  &.sidepanel-enter-active .sidepanel-backdrop {
    opacity: 1;
    transition: opacity 750ms;
  }

  &.sidepanel-exit .sidepanel-backdrop {
    opacity: 1;
  }

  &.sidepanel-exit-active .sidepanel-backdrop {
    opacity: 0;
    transition: opacity 750ms;
  }
`;

export const Backdrop = styled.div`
  width: 100%;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ChildrenContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  width: 100%;
  padding: 20px 40px;
  flex-direction: column;

  @media screen and (min-width: 700px) {
    padding: 40px 60px;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: max-content;
  background: none;
  border: none;

  & svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

export const ContentComponent = styled.div`
  margin-top: 20px;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const SidepanelTitle = styled.h2`
  color: #157416;
  font-size: 20px;
  text-align: center;
  margin-bottom: 40px;
`;
