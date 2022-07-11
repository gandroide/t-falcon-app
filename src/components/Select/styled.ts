import styled from 'styled-components';
import Select from 'react-select';

export const CustomSelect = styled(Select)`
  width: 65%;
  & .Select__control {
    border: 1px solid red;
  }
`;
