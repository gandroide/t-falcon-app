import styled from "styled-components";
import Select from 'react-select';

export const CustomSelect = styled(Select)`
    & .Select__control {
        border: 1px solid red;
    }
`