import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

export const InputsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px 0 10px 0;
`;

export const SpacementContiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 10px 0 10px 0;
`;

export const InputWithSpacement = styled.input`
  margin: 10px 0 10px 0;
  width: 50%;
`;

export const LabelComponent = styled.label`
  margin-right: 5px;
`;
