import { createContext, FC, useState } from 'react';

interface IModal {
  isOpen: boolean;
  onCloseCallback: (() => void) | null;
  onConfirmCallback: (() => void) | null;
  title: string;
  description: string;
  type: 'info' | 'warning';
}

interface IModalContext {
  modal: IModal;
  onSetModalHandler: (modalValues: IModal) => void;
  onResetModalHandler: () => void;
}

const defaultModalState: IModal = {
  isOpen: false,
  onCloseCallback: () => {},
  onConfirmCallback: null,
  title: '',
  description: '',
  type: 'info'
};

const defaultModalContext = {
  modal: {
    ...defaultModalState
  },
  onSetModalHandler: () => {},
  onResetModalHandler: () => {}
};

export const ModalContext = createContext<IModalContext>(defaultModalContext);

export const ModalProvider: FC = ({ children }) => {
  const [modal, setModal] = useState<IModal>({ ...defaultModalState });

  const onSetModalHandler = (modalValues: Partial<IModal>) => {
    setModal((prevValue) => ({ ...prevValue, ...modalValues }));
  };

  const onResetModalHandler = () => {
    onSetModalHandler({ isOpen: false });
  };

  return (
    <ModalContext.Provider
      value={{
        modal,
        onSetModalHandler,
        onResetModalHandler
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
