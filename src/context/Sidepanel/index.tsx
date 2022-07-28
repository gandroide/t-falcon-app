import { createContext, FC, ReactNode, useState } from 'react';
import { SidePanelWidth } from '../../interfaces';

interface ISidepanelContext {
  isSidepanelOpen: boolean;
  SidepanelChildren: ReactNode;
  onCloseSidepanelHandler: () => void;
  onOpenSidepanelHandler: (sidepanelValues: ISidepanelContextState) => void;
}

interface ISidepanelContextState {
  isOpen: boolean;
  SidepanelChildren: ReactNode;
  width: SidePanelWidth;
}

const defaultSidepanelContext: ISidepanelContext = {
  isSidepanelOpen: false,
  SidepanelChildren: () => {},
  onCloseSidepanelHandler: () => {},
  onOpenSidepanelHandler: () => {}
};

export const SidepanelContext = createContext<ISidepanelContext>(
  defaultSidepanelContext
);

const defaultSidepanelState: ISidepanelContextState = {
  isOpen: false,
  SidepanelChildren: () => {},
  width: 'large'
};

export const SidepanelProvider: FC = ({ children }) => {
  const [sidepanel, setSidepanel] = useState({ ...defaultSidepanelState });

  const onOpenSidepanelHandler = (sidepanelValues: ISidepanelContextState) => {
    setSidepanel(sidepanelValues);
  };

  const onCloseSidepanelHandler = () => {
    onOpenSidepanelHandler({ ...defaultSidepanelState });
  };

  return (
    <SidepanelContext.Provider
      value={{
        isSidepanelOpen: sidepanel.isOpen,
        SidepanelChildren: sidepanel.SidepanelChildren,
        onCloseSidepanelHandler,
        onOpenSidepanelHandler
      }}
    >
      {children}
    </SidepanelContext.Provider>
  );
};
