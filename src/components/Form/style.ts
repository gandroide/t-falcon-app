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
  flex-direction: column;
  margin: 10px 1px 10px 0;
  width: 25rem;
`;

export const InputWithSpacement = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;
  width: 70%;
`;

export const LabelComponent = styled.label`
  margin-right: 5px;
`;
