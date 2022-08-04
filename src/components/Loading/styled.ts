import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    from {
        background: rgb(7, 186, 46, 0.3);
    }

    to {
        background: rgb(7, 186, 46, 0.8);
    }
`;

export const LoadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1001;
`;

export const LoadingContainer = styled.span`
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
  /* border: 3px solid rgb(7, 186, 46, 0.7); */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

export const LoadingItem = styled.span`
  position: absolute;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 20px;
    background: rgb(7, 186, 46, 0.3);
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4px;
    animation: ${loading} 1s linear infinite;
  }

  &:nth-child(2) {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:nth-child(3) {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &:nth-child(4) {
    transform: translate(-50%, -50%) rotate(135deg);
  }

  &:nth-child(5) {
    transform: translate(-50%, -50%) rotate(180deg);
  }

  &:nth-child(6) {
    transform: translate(-50%, -50%) rotate(225deg);
  }

  &:nth-child(7) {
    transform: translate(-50%, -50%) rotate(270deg);
  }

  &:nth-child(8) {
    transform: translate(-50%, -50%) rotate(315deg);
  }

  &:nth-child(1):before {
    animation-delay: -0.875s;
  }

  &:nth-child(2):before {
    animation-delay: -0.75s;
  }

  &:nth-child(3):before {
    animation-delay: -0.625s;
  }

  &:nth-child(4):before {
    animation-delay: -0.5s;
  }

  &:nth-child(5):before {
    animation-delay: -0.375s;
  }

  &:nth-child(6):before {
    animation-delay: -0.25s;
  }

  &:nth-child(7):before {
    animation-delay: -0.125s;
  }

  &:nth-child(8):before {
    animation-delay: 0s;
  }
`;
