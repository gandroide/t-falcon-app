import { FC, useContext } from 'react';
import { Backdrop, CloseButton, Container, Panel } from './style';
import { CSSTransition } from 'react-transition-group';
import { SidepanelContext } from '../../context/Sidepanel';

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
          <CloseButton className="close-button" onClick={handleClose}>
            close
          </CloseButton>
          <div>{children}</div>
        </Panel>
      </Container>
    </CSSTransition>
  );
};
