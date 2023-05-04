import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle<{ isLoading: boolean }>`
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   overflow: ${({ isLoading }) => (isLoading ? 'hidden' : 'unset')};
   outline: none;
  }

  .Toastify__toast-theme--colored.Toastify__toast--info {
    background-color: "red" !important
  }
  .Toastify__toast-theme--colored.Toastify__toast--success {
  }
  .Toastify__toast-theme--colored.Toastify__toast--warning {
  }
  .Toastify__toast-theme--colored.Toastify__toast--error {
  }

  & .Toastify__toast--error {
    background: #f54242;
  }

  & .Toastify__toast--success {
    background: #157416;
  }

  & .Toastify__progress-bar {
    background: #fff;
  }

  & .Toastify__close-button {
    opacity: 0.8;
  }

  & .Toastify__close-button svg,
  & .Toastify__toast-icon svg  {
    fill: #fff;
  }

  & .Toastify__toast-body {
    color: #fff;
    opacity: 1;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }

  html {
    font-size: 75%;
  }

  body {
    background: #eee;
    color: ${({ theme }) => theme.palette.common.black};
    font-family: 'Open Sans', sans-serif;
  }

  ul {
    list-style: none;
  }

  & .modal-enter {
    opacity: 0;
  }

  & .modal-enter-active {
    opacity: 1;
    transition: opacity 0.5s;
  }

  & .modal-exit {
    opacity: 1;
  }

  & .modal-exit-active {
    opacity: 0;
    transition: opacity 0.5s;
  }

  & .modal-enter .modal-container {
    transform: translateY(-20px);
  }

  & .modal-enter-active .modal-container {
    transform: translateY(0);
    transition: transform 0.5s;
  }

  & .modal-exit .modal-container {
    transform: translateY(0);
  }

  & .modal-exit-active .modal-container {
    transform: translateY(-20px);
    transition: transform 0.5s;
  }

  & .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  & .fade-enter-active {
    opacity: 1;
    transition: opacity 250ms;
  }

  & .fade-exit {
    opacity: 1;
  }

  & .fade-exit-active {
    opacity: 0;
    transition: opacity 250ms;
  }

  .leaflet-container{
    width: 500px;
    height: 300px;
  }
`;

export const AppContainer = styled.main<{ isAdmin: boolean }>`
  width: 100%;
  max-width: 1500px;
  margin: ${({ isAdmin }) => (isAdmin ? '0px auto 30px' : '50px auto')};
  padding: 20px;
  border-radius: 4px;
`;

export const AdminContainer = styled.div`
  padding: 2rem;
`;

export const AdminTitleContainer = styled.div<{ column?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ column }) => (column ? '15px' : '0')};

  @media screen and (min-width: 576px) {
    margin-bottom: 0;
  }
`;

export const AdminHeaderContainer = styled.div<{ column?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  align-items: ${({ column }) => (column ? 'flex-start' : 'center')};

  @media screen and (min-width: 576px) {
    & {
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const PrimaryButton = styled.button`
  background: none;
  padding: 5px 16px;
  background-color: green;
  border-radius: 3px;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const AdminHeaderButtonsContainer = styled.div`
  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export const BurgerIconButton = styled.button`
  border: none;
  background: none;
  display: flex;
  margin-right: 10px;

  @media screen and (min-width: 992px) {
    display: none;
  }
`;
