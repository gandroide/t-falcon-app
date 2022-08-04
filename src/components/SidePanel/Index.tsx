import { FC, useContext } from 'react';
import {
  Backdrop,
  ChildrenContainer,
  CloseButton,
  Container,
  ContentComponent,
  Panel
} from './style';
import { CSSTransition } from 'react-transition-group';
import { SidepanelContext } from '../../context/Sidepanel';
import { BsFillBackspaceFill } from 'react-icons/bs';

interface ISidepanel {
  openPanel: boolean;
  children: React.ReactNode[] | React.ReactNode;
  sidepanelWidth: string;
}

export const SidePanel: FC<ISidepanel> = ({
  openPanel,
  children,
  sidepanelWidth
}) => {
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
        <Panel
          sidepanelWidth={sidepanelWidth ?? '100%'}
          className="sidepanel-panel"
        >
          <ChildrenContainer>
            <CloseButton>
              <BsFillBackspaceFill size="2em" onClick={handleClose} />
            </CloseButton>
            <ContentComponent>{children}</ContentComponent>
          </ChildrenContainer>
        </Panel>
      </Container>
    </CSSTransition>
  );
};
