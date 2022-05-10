import { FC } from 'react'
import { Backdrop, CloseButton, Container, Panel } from './style'
import { CSSTransition } from 'react-transition-group';

interface ISidepanel {
  openPanel: boolean;
  setOpenPanel: (state: boolean)=>void;
  children?: JSX.Element[];
}

export const SidePanel: FC<ISidepanel> = ({openPanel, setOpenPanel, children}) => {
console.log(children, "children")
  const handleClose = () => {
    setOpenPanel(false)
  }

  return (
    <CSSTransition in={openPanel} timeout={300} classNames="sidepanel" unmountOnExit mountOnEnter>
      <Container>
        <Backdrop className='sidepanel-backdrop' onClick={handleClose}/>
        <Panel className='sidepanel-panel'>
          <CloseButton className='close-button' onClick={handleClose}>close</CloseButton>
            <div>        
              {children}
            </div>
        </Panel>
      </Container>
    </CSSTransition>
  )
}
