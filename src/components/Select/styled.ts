import styled from 'styled-components';
import Select from 'react-select';

export const CustomSelect = styled(Select)`
  width: 100%;

  & .Select__control {
    border: 1px solid #cbcbcb;
    box-shadow: none;
  }

  & .Select__control:hover {
    border: 1px solid #119c5d;
    box-shadow: none;
  }

  & .Select__option--is-focused {
    background-color: #1574164d;
    color: #fff;
  }

  & .Select__option--is-selected {
    background-color: #157416;
    color: #fff;
  }
`;
