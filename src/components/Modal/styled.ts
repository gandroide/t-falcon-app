import styled from 'styled-components';

type IDialogColor = {
  color: string;
};

export const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const DialogBackdrop = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

export const DialogContainer = styled.div<IDialogColor>`
  background: #fff;
  border-radius: 4px;
  z-index: 0;
  transform-style: preserve-3d;
  border-top: 8px solid ${({ color }) => color};
`;

export const DialogContentWrapper = styled.div`
  display: flex;
  padding: 16px;
  width: 100%;
  max-width: 450px;
  border-bottom: 1px solid #157416;
`;

export const DialogIcon = styled.span<IDialogColor>`
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  color: ${({ color }) => color};
`;

export const DialogContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DialogTitle = styled.h2`
  margin-bottom: 10px;
`;

export const DialogCta = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;

  & > :not(:last-child) {
    margin-right: 8px;
  }
`;

export const DialogDescription = styled.p`
  font-size: 14px;
`;
