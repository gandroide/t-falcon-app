import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormTitle = styled.h2`
  margin-bottom: 40px;
  color: #157416;
  text-align: center;
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
  background: #fff;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  width: 100%;
  border: none;
  background: #fff;
  resize: none;
`;

export const InputLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

export const InputContent = styled.div<{
  hasError?: boolean;
  isFocused?: boolean;
}>`
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  overflow: hidden;

  ${({ isFocused }) =>
    isFocused &&
    `
    border-color: #119c5d;
  `}

  ${({ hasError }) =>
    hasError &&
    `
    border-color: red;
  `}
`;

export const FormCtaContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

export const InputError = styled.span`
  color: red;
`;
