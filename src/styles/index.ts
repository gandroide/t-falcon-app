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
`;
