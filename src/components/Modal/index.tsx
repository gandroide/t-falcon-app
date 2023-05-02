import { FC, useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

import {
  DialogWrapper,
  DialogBackdrop,
  DialogContainer,
  DialogContentWrapper,
  DialogIcon,
  DialogContent,
  DialogCta,
  DialogTitle,
  DialogDescription
} from './styled';
import { ModalContext } from '../../context/Modal';
import { Button } from '../Button';

interface IModal {
  isOpen: boolean;
  onCloseCallback: (() => void) | null;
  onConfirmCallback: (() => void) | null;
  title: string;
  description: string;
  type: 'info' | 'warning';
}

const modalTypes = {
  info: {
    color: '#157416',
    icon: <IoMdInformationCircleOutline />
  },
  warning: {
    color: '#f22c36',
    icon: <IoWarningOutline />
  }
};

export const Modal: FC<IModal> = ({
  isOpen,
  onCloseCallback,
  onConfirmCallback,
  title,
  description,
  type
}) => {
  const { onResetModalHandler } = useContext(ModalContext);

  const onConfirmHandler = () => {
    onConfirmCallback?.();
    onResetModalHandler();
  };

  const onCloseHandler = () => {
    onCloseCallback?.();
    onResetModalHandler();
  };

  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} timeout={500} classNames="modal" unmountOnExit>
      <DialogWrapper>
        <DialogBackdrop className="modal-backdrop" onClick={onCloseHandler} />
        <DialogContainer
          className="modal-container"
          color={modalTypes[type].color}
        >
          <DialogContentWrapper>
            <DialogIcon color={modalTypes[type].color}>
              {modalTypes[type].icon}
            </DialogIcon>
            <DialogContent>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogContent>
          </DialogContentWrapper>
          <DialogCta>
            <Button type="secondary" onClick={onCloseHandler}>
              Cancel
            </Button>
            <Button type="primary" onClick={onConfirmHandler}>
              Confirmar
            </Button>
          </DialogCta>
        </DialogContainer>
      </DialogWrapper>
    </CSSTransition>,
    document.querySelector('body')!
  );
};
