import { FC, useContext } from 'react';
import {
  Backdrop,
  ChildrenContainer,
  CloseButton,
  Container,
  Panel
} from './style';
import { CSSTransition } from 'react-transition-group';
import { SidepanelContext } from '../../context/Sidepanel';
import { Button } from '../Button';

interface ISidepanel {
  openPanel: boolean;
  children: React.ReactNode[] | React.ReactNode;
}

export const SidePanel: FC<ISidepanel> = ({ openPanel, children }) => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

  const handleClose = () => {
    onCloseSidepanelHandler();
  };

  return (
    <CSSTransition
      in={openPanel}
      timeout={300}
      classNames="sidepanel"
      unmountOnExit
      mountOnEnter
    >
      <Container>
        <Backdrop className="sidepanel-backdrop" onClick={handleClose} />
        <Panel className="sidepanel-panel">
          <ChildrenContainer>
            {children}
            <CloseButton>
              <Button className="close-button" onClick={handleClose}>
                back
              </Button>
            </CloseButton>
          </ChildrenContainer>
        </Panel>
      </Container>
    </CSSTransition>
  );
};
