import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: none;
  background: none;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  width: 100%;
  border: none;
  background: none;
  resize: none;
`;

export const InputLabel = styled.label`
  margin-bottom: 5px;
`;

export const InputContent = styled.div<{ hasError?: boolean }>`
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : 'black')};
  border-radius: 4px;
`;

export const FormButton = styled.button`
  margin-top: 40px;
`;

export const InputError = styled.span`
  color: red;
`;
