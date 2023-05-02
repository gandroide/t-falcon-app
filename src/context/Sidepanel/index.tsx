import { createContext, FC, ReactNode, useCallback, useState } from 'react';

interface ISidepanelContext {
  isSidepanelOpen: boolean;
  SidepanelChildren: ReactNode;
  onCloseSidepanelHandler: (sidepanelWidth: string) => void;
  onOpenSidepanelHandler: (sidepanelValues: ISidepanelContextState) => void;
  sidepanelWidth: string;
}

interface ISidepanelContextState {
  isOpen: boolean;
  SidepanelChildren: ReactNode;
  sidepanelWidth: string;
}

const defaultSidepanelContext: ISidepanelContext = {
  isSidepanelOpen: false,
  SidepanelChildren: () => {},
  onCloseSidepanelHandler: () => {},
  onOpenSidepanelHandler: () => {},
  sidepanelWidth: ''
};

export const SidepanelContext = createContext<ISidepanelContext>(
  defaultSidepanelContext
);

const defaultSidepanelState: ISidepanelContextState = {
  isOpen: false,
  SidepanelChildren: () => {},
  sidepanelWidth: ''
};

export const SidepanelProvider: FC = ({ children }) => {
  const [sidepanel, setSidepanel] = useState({ ...defaultSidepanelState });

  const onOpenSidepanelHandler = useCallback(
    (sidepanelValues: ISidepanelContextState) => {
      setSidepanel(sidepanelValues);
    },
    [setSidepanel]
  );

  const onCloseSidepanelHandler = (sidepanelWidth: string) => {
    onOpenSidepanelHandler({ ...defaultSidepanelState, sidepanelWidth });
  };

  return (
    <SidepanelContext.Provider
      value={{
        isSidepanelOpen: sidepanel.isOpen,
        SidepanelChildren: sidepanel.SidepanelChildren,
        sidepanelWidth: sidepanel.sidepanelWidth,
        onCloseSidepanelHandler,
        onOpenSidepanelHandler
      }}
    >
      {children}
    </SidepanelContext.Provider>
  );
};
