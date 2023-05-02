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

export const AppContainer = styled.main`
  width: 100%;
  max-width: 1500px;
  margin: 50px auto 0;
  /* background: #fff; */
  padding: 20px;
  border-radius: 4px;
  /* box-shadow: 0px 2px 5px 5px #ddd; */
`;

export const AdminContainer = styled.div`
  padding: 2rem;
`;

export const AdminTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  @media screen and (min-width: 576px) {
    margin-bottom: 0;
  }
`;

export const AdminHeaderContainer = styled.div<{ column?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};

  @media screen and (min-width: 576px) {
    & {
      flex-direction: row;
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
