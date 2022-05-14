import { createGlobalStyle } from 'styled-components';
// import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;

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
    background: ${({theme}) => theme.palette.background};
    color: ${({theme}) => theme.palette.text};
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
`;
