import React, { FC, useState } from 'react'
import { Backdrop, Container, Panel } from './style'
import { CSSTransition } from 'react-transition-group';

interface ISidepanel {
  openPanel: boolean;
}

export const SidePanel: FC<ISidepanel> = ({openPanel}) => {
  return (
    <CSSTransition in={openPanel} timeout={300} classNames="sidepanel" unmountOnExit mountOnEnter>
      <Container>
        <Backdrop className='sidepanel-backdrop'/>
        <Panel className='sidepanel-panel'>
          <div>        
            SidePanel
          </div>
        </Panel>
      </Container>
    </CSSTransition>
  )
}
